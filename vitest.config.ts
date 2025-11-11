import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./src/setupTests.ts"],
		globals: true,
		coverage: {
			provider: "v8",
		},
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		pool: "threads",
	},
});


