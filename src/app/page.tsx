"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setItems, setStatus, setError, setSearchTerm } from "../store/foodsSlice";
import { listFoods, searchFoods } from "../lib/api/food";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import Modal from "../components/Modal";
import FoodForm, { type FoodFormValues } from "../components/FoodForm";
import { closeAdd, setGlobalLoading } from "../store/uiSlice";
import { createFood } from "../lib/api/food";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, error, searchTerm } = useAppSelector((s) => s.foods);
  const { modalAddOpen, globalLoading } = useAppSelector((s) => s.ui);

  useEffect(() => {
    dispatch(setStatus("loading"));
    const run = async () => {
      try {
        const data = searchTerm.trim()
          ? await searchFoods(searchTerm.trim())
          : await listFoods();
        dispatch(setItems(data));
        dispatch(setStatus("succeeded"));
        dispatch(setError(null));
      } catch (e: any) {
        dispatch(setError(e?.message ?? "Failed to load foods"));
        dispatch(setStatus("failed"));
      }
    };
    run();
  }, [dispatch, searchTerm]);

  return (
    <main className="food-container py-10">
      <SearchBar
        value={searchTerm}
        onDebouncedChange={(v) => dispatch(setSearchTerm(v))}
        disabled={status === "loading" || globalLoading}
        error={error}
      />

      {status === "loading" && (
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
          Loading...
        </div>
      )}

      {status !== "loading" && items.length === 0 && !error && (
        <div className="empty-state-message text-zinc-600 dark:text-zinc-300">
          No items available
        </div>
      )}

      <FoodList items={items} />

      <Modal
        open={modalAddOpen}
        onClose={() => dispatch(closeAdd())}
        title="Add Food"
      >
        <FoodForm
          mode="add"
          onCancel={() => dispatch(closeAdd())}
          onSubmit={async (values: FoodFormValues) => {
            try {
              dispatch(setGlobalLoading(true));
              await createFood({
                name: values.food_name,
                rating: values.food_rating,
                image: values.food_image,
                restaurant: {
                  name: values.restaurant_name,
                  logo: values.restaurant_logo,
                  status: values.restaurant_status,
                },
              });
              const data = await listFoods();
              dispatch(setItems(data));
              dispatch(closeAdd());
            } finally {
              dispatch(setGlobalLoading(false));
            }
          }}
        />
      </Modal>
    </main>
  );
}
