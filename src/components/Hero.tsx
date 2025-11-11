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
    <section className="relative w-full min-h-[70vh] md:min-h-[500px] flex items-center overflow-hidden"
    style={{
      background: "rgba(255, 179, 14, 1)"
    }}>      
      <div className="container mx-auto px-4 lg:px-36 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full max-w-2xl text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Are you starving?
            </h1>
            <p className="text-lg text-white mb-8">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${heroMode === "Delivery" ? "bg-red-100 text-red-600" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"}`}
                  onClick={() => setHeroMode("Delivery")}
                >
                  <span className="text-base">🚴</span>
                  <span>Delivery</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${heroMode === "Pickup" ? "bg-red-100 text-red-600 dark:bg-red-900/50" : "text-gray-600 dark:text-gray-800 cursor-pointer"}`}
                  onClick={() => setHeroMode("Pickup")}
                >
                  <span className="text-base">🛍</span>
                  <span>Pickup</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-base text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                  </span>
                  </div>
                  <input
                    id="food-search-hero"
                    className="w-full pl-10 pr-4 py-3 focus:outline-none rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    placeholder="What do you like to eat today?"
                    type="text"
                    value={heroQuery}
                    onChange={(e) => setHeroQuery(e.target.value)}
                    disabled={globalLoading}
                  />
                </div>
                <button
                  className="w-full sm:w-auto focus-none flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 cursor-pointer bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-200"
                  onClick={() => dispatch(setSearchTerm(heroQuery))}
                  disabled={globalLoading}
                >
                  <span className="text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                  </span>
                  <span>Find Meal</span>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-[40%] translate-x-1/4 lg:translate-x-1/3 xl:-translate-x-[40%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[400px] lg:h-[700px]">
        <img
          alt="A delicious bowl of ramen with a boiled egg, chili, and green onions."
          className="w-full h-full object-contain drop-shadow-2xl"
          src="/landing/hero/Image_Base.png"
        />
      </div>
    </section>
  );
}


