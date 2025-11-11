import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onDebouncedChange: (v: string) => void;
  disabled?: boolean;
  error?: string | null;
};

export default function SearchBar({
  value,
  onDebouncedChange,
  disabled,
  error,
}: Props) {
  const [text, setText] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleChange(v: string) {
    setText(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onDebouncedChange(v), 400);
  }

  return (
    <section className="mb-6">
      <label htmlFor="food-search" className="sr-only">
        Search foods
      </label>
      <input
        id="food-search"
        className="food-input max-w-xl"
        placeholder="Enter food name"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        aria-describedby={error ? "food-search-error" : undefined}
      />
      {error && (
        <div id="food-search-error" className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </section>
  );
}
