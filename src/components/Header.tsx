import Link from "next/link";

export default function Header() {
  return (
    <header className="food-header border-b border-zinc-200 bg-white/70 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="food-container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          FoodWagen
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="#" className="hover:underline">
            Foods
          </Link>
          <Link href="#" className="hover:underline">
            Add Food
          </Link>
        </nav>
      </div>
    </header>
  );
}


