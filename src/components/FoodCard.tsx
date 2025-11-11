"use client";

import { useEffect, useRef, useState } from "react";
import type { Food } from "../types/food";
import { useAppDispatch } from "../store";
import { openEdit, openDelete } from "../store/uiSlice";

export default function FoodCard({ food }: { food: Food }) {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [menuOpen]);

  const price = (food as unknown as { price?: number })?.price;
  const status = food.restaurant?.status ?? "Closed";
  const statusClasses =
    status === "Open Now"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-orange-100 text-orange-700";

  return (
    <article className="food-card food-hover food-animate-in bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {price != null && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            <span>🏷</span>${price.toFixed(2)}
          </span>
        )}
        <img
          src={food.image || "/vercel.svg"}
          alt={food.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {food.restaurant?.logo ? (
            <img
              src={food.restaurant.logo}
              alt={food.restaurant.name}
              className="restaurant-logo h-9 w-9 rounded-lg object-cover"
            />
          ) : (
            <div className="restaurant-logo h-9 w-9 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          )}
          <div className="min-w-0">
            <h3 className="food-name truncate text-base font-semibold">
              {food.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span>⭐</span>
              <span className="food-rating">{Number(food.rating ?? 0).toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            aria-label="Open actions"
            className="food-btn border px-2 py-1"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ⋯
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border border-zinc-200 bg-white p-2 text-sm shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              <button
                className="block w-full rounded px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700"
                data-test-id="food-edit-btn"
                onClick={() => {
                  setMenuOpen(false);
                  dispatch(openEdit(food.id));
                }}
              >
                Edit
              </button>
              <button
                className="block w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                data-test-id="food-delete-btn"
                onClick={() => {
                  setMenuOpen(false);
                  dispatch(openDelete(food.id));
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <span className={`restaurant-status inline-flex rounded-xl px-3 py-1 text-sm ${statusClasses}`}>
          {status}
        </span>
      </div>
    </article>
  );
}
