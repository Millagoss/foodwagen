"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setItems, setStatus, setError, setSearchTerm } from "../store/foodsSlice";
import { listFoods, searchFoods } from "../lib/api/food";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, error, searchTerm } = useAppSelector((s) => s.foods);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(setStatus("loading"));
    const run = async () => {
      try {
        const data = searchTerm.trim()
          ? await searchFoods(searchTerm.trim())
          : await listFoods();
        dispatch(setItems(data));
        dispatch(setStatus("succeeded"));
        dispatch(setError(null));
      } catch (e: any) {
        dispatch(setError(e?.message ?? "Failed to load foods"));
        dispatch(setStatus("failed"));
      }
    };
    run();
  }, [dispatch, searchTerm]);

  return (
    <main className="food-container py-10">
      <SearchBar
        value={searchTerm}
        onDebouncedChange={(v) => dispatch(setSearchTerm(v))}
        disabled={status === "loading"}
        error={error}
      />

      {status === "loading" && (
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
          Loading...
        </div>
      )}

      {status !== "loading" && items.length === 0 && !error && (
        <div className="empty-state-message text-zinc-600 dark:text-zinc-300">
          No items available
        </div>
      )}

      <FoodList items={items} />
    </main>
  );
}
