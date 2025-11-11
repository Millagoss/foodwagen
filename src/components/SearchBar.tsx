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
  let timer: NodeJS.Timeout | undefined;
  return (
    <section className="mb-6">
      <label htmlFor="food-search" className="sr-only">
        Search foods
      </label>
      <input
        id="food-search"
        className="food-input max-w-xl"
        placeholder="Enter food name"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => onDebouncedChange(v), 300);
        }}
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
