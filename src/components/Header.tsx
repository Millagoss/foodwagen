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

        <div className="items-center gap-3 md:flex">
          {/* <ThemeToggle /> */}
          <button className="food-btn" data-test-id="food-add-btn" onClick={() => dispatch(openAdd())} disabled={globalLoading}>
            Add Meal
          </button>
        </div>        
      </div>
    </header>
  );
}
