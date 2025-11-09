import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="food-footer border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" data-test-id="food-footer">
      <div className="food-container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/landing/header/Logo.png" alt="FoodWagen" width={28} height={28} className="h-7 w-7" />
              <span className="text-lg font-semibold tracking-tight">FoodWagen</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Tasty meals, featured spots, and smooth management.
            </p>
          </div>

        <nav aria-label="Footer primary" className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <div className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Menu</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="#" className="hover:underline">Foods</Link></li>
                <li><Link href="#" className="hover:underline">Add Meal</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Company</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">About</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Blog</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Support</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Help Center</Link></li>
                <li><Link href="#" className="hover:underline">Contact</Link></li>
                <li><Link href="#" className="hover:underline">Status</Link></li>
              </ul>
            </div>
          </nav>

          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Subscribe</div>
            <form className="flex gap-2" data-test-id="food-subscribe-form">
              <input
                type="email"
                name="food_subscribe_email"
                className="food-input"
                placeholder="Enter food news email"
                aria-label="Email for food updates"
              />
              <button type="submit" className="food-btn bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 md:flex-row">
          <div>© {year} FoodWagen, Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="mailto:support@foodwagen.dev" className="hover:underline">support@foodwagen.dev</a>
            <span>·</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


