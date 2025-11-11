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
    <article className="food-card p-0 py-2 food-hover food-animate-in bg-white">
      <div className="relative mb-3 h-[250px] w-full aspect-video rounded-xl overflow-hidden bg-zinc-100">
        {price != null && (
          <span className="food-price absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-1 text-md font-semibold text-white shadow-md">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" /></svg></span>${Number(price)?.toFixed(2)}
          </span>
        )}
        <img
          src={food.image || "/favicon.ico"}
          alt={food.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          {food.restaurant?.logo ? (
            <img
              src={food.restaurant.logo}
              alt={food.restaurant.name}
              className="restaurant-logo h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="restaurant-logo h-12 w-12 rounded-lg bg-zinc-200" />
          )}
          <div className="min-w-0">
            <h3 className="food-name truncate text-base font-semibold">
              {food.name}
            </h3>
            {food.restaurant?.name && (
              <p className="restaurant-name text-sm text-gray-600 truncate">
                {food.restaurant.name}
              </p>
            )}
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span>⭐</span>
              <span className="food-rating">{Number(food?.rating || 0).toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            aria-label="Open actions"
            className="focus-none bg-none rotate-90 text-gray-600 border-none hover:bg-gray-200 transition-colors duration-200 rounded-md cursor-pointer border px-2 py-1"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border border-zinc-200 bg-white p-2 text-sm shadow-lg">
              <button
                className="block w-full rounded px-3 py-2 text-left hover:bg-zinc-100"
                data-test-id="food-edit-btn"
                onClick={() => {
                  setMenuOpen(false);
                  dispatch(openEdit(food.id));
                }}
              >
                Edit
              </button>
              <button
                className="block w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
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

      <div className="mt-4">
        <span className={`restaurant-status inline-flex rounded-xl px-3 py-1 text-sm ${statusClasses}`}>
          {status}
        </span>
      </div>
    </article>
  );
}
