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
      className="flex items-center overflow-hidden rounded-full border border-white/10 bg-black/80 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Field orientation="horizontal" className="w-full items-center gap-2">
        <FieldLabel htmlFor="movie-search" className="sr-only">
          Search movies
        </FieldLabel>
        <FieldContent className="w-full">
          <Input
            id="movie-search"
            name="q"
            type="search"
            placeholder="Enter keyword"
            className="w-full border-0 bg-transparent px-4 py-3 text-base text-white placeholder:text-gray-400 focus-visible:ring-0 md:text-base"
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
          className="h-[44px] rounded-full bg-red-600 px-5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-colors duration-200 hover:bg-red-500 md:px-6 md:text-base"
        >
          Search
        </Button>
      </Field>
    </form>
  )
}

export default SearchInput;