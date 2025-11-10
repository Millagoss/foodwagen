 "use client";
 
import type { Food } from "../types/food";
import { useAppDispatch } from "../store";
import { openEdit, openDelete } from "../store/uiSlice";

export default function FoodCard({ food }: { food: Food }) {
  const dispatch = useAppDispatch();
  return (
    <article className="food-card food-hover food-animate-in">
      <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <img src={food.image || "/vercel.svg"} alt={food.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="food-name text-base font-semibold">{food.name}</h3>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="food-rating">⭐ {Number(food.rating ?? 0).toFixed(1)}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {food.restaurant?.logo ? (
          <img src={food.restaurant.logo} alt={food.restaurant.name} className="restaurant-logo h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="restaurant-logo h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        )}
        <div className="min-w-0">
          <div className="restaurant-name truncate text-sm font-medium">
            {food.restaurant?.name ?? "Unknown restaurant"}
          </div>
          <div className="restaurant-status text-xs text-zinc-500">
            {food.restaurant?.status ?? "Closed"}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button className="food-btn border text-sm" data-test-id="food-edit-btn" onClick={() => dispatch(openEdit(food.id))}>
          Edit Food
        </button>
        <button className="food-btn bg-red-600 text-white text-sm hover:bg-red-700" data-test-id="food-delete-btn" onClick={() => dispatch(openDelete(food.id))}>
          Delete Food
        </button>
      </div>
    </article>
  );
}


