"use client"

import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface SearchState {
    keyword: string;
    setKeyword: (keyword: string) => void;
    clearKeyword: () => void;
}
export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            keyword: "",
            setKeyword: (keyword: string) => set({ keyword }),
            clearKeyword: () => set({ keyword: "" }),
        }),
        {
            name: "movie-web-search-keywords",
            storage: createJSONStorage(() => localStorage),
        }
    )
);