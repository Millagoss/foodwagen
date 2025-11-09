import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="food-header sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80"
      data-test-id="food-header"
    >
      <div className="food-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="FoodWagen Home">
          <Image
            src="/landing/header/Logo.png"
            alt="FoodWagen"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">FoodWagen</span>
        </Link>
 

        <div className="hidden md:block">
          <button className="food-btn bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-white" data-test-id="food-add-btn">
            Add Meal
          </button>
        </div>

        <button
          className="food-btn md:hidden"
          aria-label="Open Menu"
          data-test-id="food-mobile-menu"
        >
          <span className="i-heroicons-bars-3 h-5 w-5">☰</span>
        </button>
      </div>
    </header>
  );
}


