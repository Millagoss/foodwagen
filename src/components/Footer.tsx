import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#212121] text-neutral-600 dark:bg-background-dark dark:text-neutral-300">
      <div className="container mx-auto px-36 py-10">
        <div className="flex justify-between">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-md font-bold text-neutral-800 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-md font-bold text-neutral-800 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Help &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Partner with us
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-md font-bold text-neutral-800 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Refund &amp; Cancellation
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors duration-300 hover:text-primary"
                  href="#"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
</div>
          <div>
            <h3 className="mb-4 text-md font-bold text-neutral-500">
              FOLLOW US
            </h3>
            <div className="mb-6 flex space-x-4">
              <Link
                aria-label="Instagram"
                className="text-neutral-500 transition-colors duration-300 hover:text-primary"
                href="#"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                aria-label="Facebook"
                className="text-neutral-500 transition-colors duration-300 hover:text-primary"
                href="#"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                aria-label="Twitter"
                className="text-neutral-500 transition-colors duration-300 hover:text-primary"
                href="#"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </Link>
            </div>
            <p className="mb-4">Receive exclusive offers in your mailbox</p>
            <form className="flex w-full max-w-sm gap-2">
              <div className="relative grow">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  className="w-full rounded-md border border-neutral-300 bg-neutral-200 py-2.5 pl-10 pr-4 text-neutral-800 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                  placeholder="Enter Your email"
                  required
                  type="email"
                />
              </div>
              <button
                className="food-btn shadow-[0px_10px_15px] shadow-amber-300/40"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
        

        <div className="mt-12 flex flex-col items-center justify-between border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 sm:flex-row">
          <p className="mb-4 sm:mb-0">
            All rights Reserved © Your Company, {year}
          </p>
          <p>
            Made with{" "}
            <span aria-hidden className="text-red-500">
              ♥
            </span>{" "}
            by Themewagon
          </p>
        </div>
      </div>
    </footer>
  );
}
