"use client"

import React, {useEffect} from "react";
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Field, FieldContent, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { useRouter, usePathname } from 'next/navigation';
import * as z from "zod"; 
import { useForm } from "react-hook-form";
import {useSearchStore} from "@/lib/store/searchStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchInputProps } from "../../type";


const searchSchema = z.object({
  q: z.string().min(1, "Search query is required"),
});

const SearchInput = ({searchPath}: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {keyword, setKeyword} = useSearchStore();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      q: keyword,
    },
  });

  useEffect(() => {
    form.setValue("q", keyword);
  }, [keyword, form])

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    const query = values.q.trim();
    if (!query) return;
    setKeyword(query);
   const targetPath = searchPath?? (pathname.startsWith("/Movie") ? "/Movie" : pathname.startsWith("/TVSeries") ? "/TVSeries" : "/Movie");
    router.push(`${targetPath}?query=${encodeURIComponent(query)}`);
  }
  return (
    <form
      role="search"
      className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit"
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <FieldLabel htmlFor="movie-search" className="sr-only">
          Search movies
        </FieldLabel>
        <FieldContent className="w-full">
          <Input
            id="movie-search"
            name="q"
            type="search"
            placeholder="Enter keyword"
            className="h-10 rounded-full border-0 bg-transparent px-6 text-base text-white shadow-none
             focus-visible:ring-0 focus-visible:border-0 dark:bg-transparent
             flex-1 md:flex-auto md:w-96 md:text-lg"
            {...form.register("q", {
              onChange: (event) => {
                setKeyword(event.target.value);
              }
            })}
          />
        </FieldContent>

        <Button
          type="submit"
          aria-label="Search"
          className="btn-sm btn-primary py-1 h-9"
        >
          Search
        </Button>
    </form>
  )
}

export default SearchInput;