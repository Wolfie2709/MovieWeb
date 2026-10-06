"use client"

import React from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Field, FieldContent, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import * as z from "zod"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  q: z.string().min(1, "Search query is required"),
});

const SearchInput = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    const query = values.q.trim();
    if (!query) return;

    router.push(`/Movie/${encodeURIComponent(query)}`);
    form.reset();
  }
  return (
    <form role="search" className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
      <Field orientation="horizontal" className="items-center gap-2">
        <FieldLabel htmlFor="movie-search" className="sr-only">
          Search movies
        </FieldLabel>
        <FieldContent>
          <Input
            id="movie-search"
            name="q"
            type="search"
            placeholder="Search movies..."
            className="h-10"
            {...form.register("q")}
          />
        </FieldContent>
        <Button type="submit" variant="outline" size="icon" aria-label="Search">
          <Search />
        </Button>
      </Field>
    </form>
  )
}

export default SearchInput;