"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setItems, setStatus, setError, setSearchTerm } from "../store/foodsSlice";
import { listFoods, searchFoods } from "../lib/api/food";
import type { Food } from "../types/food";

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
      <section className="mb-6">
        <label htmlFor="food-search" className="sr-only">
          Search foods
        </label>
        <input
          id="food-search"
          className="food-input max-w-xl"
          placeholder="Enter food name"
          value={searchTerm}
          onChange={(e) => {
            const v = e.target.value;
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => dispatch(setSearchTerm(v)), 300);
          }}
          disabled={status === "loading"}
          aria-describedby={error ? "food-search-error" : undefined}
        />
        {error && (
          <div id="food-search-error" className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </section>

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

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((food: Food) => (
          <article
            key={food.id}
            className="food-card food-hover food-animate-in"
          >
            <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <img
                src={food.image || "/vercel.svg"}
                alt={food.name}
                  className="h-full w-full object-cover"
              />
            </div>
            <h3 className="food-name text-base font-semibold">{food.name}</h3>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="food-rating">⭐ {Number(food.rating ?? 0).toFixed(1)}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {food.restaurant?.logo ? (
                <img
                  src={food.restaurant.logo}
                  alt={food.restaurant.name}
                  className="restaurant-logo h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="restaurant-logo h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              )}
              <div className="min-w-0">
                  <div className="restaurant-name truncate text-sm font-medium">
                  {food.restaurant?.name ?? "Unknown restaurant"}
                </div>
                <div className="restaurant-status text-xs text-zinc-500">
                  {food.restaurant?.status ?? "Closed"}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
