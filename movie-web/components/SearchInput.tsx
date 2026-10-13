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
    <form role="search" className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit" onSubmit={form.handleSubmit(onSubmit)}>
      <Field orientation="horizontal" className="items-center gap-2 pb-1">
        <FieldLabel htmlFor="movie-search" className="sr-only">
          Search movies
        </FieldLabel>
        <FieldContent>
          <Input
            id="movie-search"
            name="q"
            type="search"
            placeholder="Search movies..."
            className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
            {...form.register("q", {
              onChange: (event) => {
                setKeyword(event.target.value);
              }
            })}
          />
        </FieldContent>
        <Button type="submit" variant="outline" size="icon" aria-label="Search" className="btn-sm btn-primary py-1">
          <Search />
        </Button>
      </Field>
    </form>
  )
}

export default SearchInput;