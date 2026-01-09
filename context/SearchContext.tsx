"use client";

import { createContext, useContext, useState } from "react";

// shape of the search context
type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
};

// Create the search context
const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState(""); 
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be inside SearchProvider"); 
  return ctx; }
