"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store";
import { openAdd } from "../store/uiSlice";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const dispatch = useAppDispatch();
  const { globalLoading } = useAppSelector((s) => s.ui);
  return (
    <header
      className="food-header sticky top-0 z-40 border-b border-zinc-200 bg-white"
      data-test-id="food-header"
    >
      <div className="food-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FoodWagen Home"
        >
          <Image
            src="/landing/header/Logo.png"
            alt="FoodWagen"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            FoodWagen
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {/* <ThemeToggle /> */}
          <button className="food-btn" data-test-id="food-add-btn" onClick={() => dispatch(openAdd())} disabled={globalLoading}>
            Add Meal
          </button>
        </div>

        <button
          className="food-btn md:hidden"
          aria-label="Open Menu"
          data-test-id="food-mobile-menu"
        >
          <span className="i-heroicons-bars-3 h-5 w-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
          </span>
        </button>
      </div>
    </header>
  );
}
