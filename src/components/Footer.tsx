import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="food-footer border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="food-container grid gap-6 py-8 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold">FoodWagen</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Manage and discover featured foods with ease.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
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
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <div>© {year} FoodWagen, Inc.</div>
          <div>Addis Ababa, Ethiopia</div>
          <a href="mailto:support@foodwagen.dev" className="hover:underline">
            support@foodwagen.dev
          </a>
        </div>
      </div>
    </footer>
  );
}


