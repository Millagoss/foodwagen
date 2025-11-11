"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchTerm } from "../store/foodsSlice";

export default function Hero() {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((s) => s.foods);
  const { globalLoading } = useAppSelector((s) => s.ui);

  const [heroMode, setHeroMode] = useState<"Delivery" | "Pickup">("Delivery");
  const [heroQuery, setHeroQuery] = useState(searchTerm);

  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-12 sm:px-10 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-2 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Are you starving?
          </h1>
          <p className="mb-6 text-white/90">
            Within a few clicks, find meals that are accessible near you
          </p>
          <div className="rounded-xl bg-white p-4 shadow-xl">
            <div className="mb-3 flex gap-3">
              <button
                className={`food-btn border text-sm ${heroMode === "Delivery" ? "bg-orange-50 text-orange-600 border-orange-200" : ""}`}
                onClick={() => setHeroMode("Delivery")}
              >
                🚴 Delivery
              </button>
              <button
                className={`food-btn border text-sm ${heroMode === "Pickup" ? "bg-orange-50 text-orange-600 border-orange-200" : ""}`}
                onClick={() => setHeroMode("Pickup")}
              >
                📦 Pickup
              </button>
            </div>
            <div className="flex items-stretch gap-3">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
                <input
                  id="food-search-hero"
                  className="food-input pl-9"
                  placeholder="What do you like to eat today?"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  disabled={globalLoading}
                />
              </div>
              <button
                className="food-btn bg-black text-white dark:bg-zinc-100 dark:text-black"
                onClick={() => dispatch(setSearchTerm(heroQuery))}
                disabled={globalLoading}
              >
                🔎 Find Meal
              </button>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <img
            src="/landing/hero/Image.png"
            alt="Noodles bowl"
            className="mx-auto w-[520px] max-w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}


