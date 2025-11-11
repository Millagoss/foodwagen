import type { Food } from "../types/food";
import FoodCard from "./FoodCard";

export default function FoodList({ items }: { items: Food[] }) {
  return (
     <section className="mt-2 grid grid-cols-1 gap-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f) => (
        <FoodCard key={f.id} food={f} />
      ))}
    </section>
     
  );
}
