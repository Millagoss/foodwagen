"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchFoods,
  setStatus,
  setError,
  setSearchTerm,
  setPage,
  createFoodThunk,
  updateFoodThunk,
  deleteFoodThunk,
} from "../store/foodsSlice"; 
import FoodList from "../components/FoodList";
import Modal from "../components/Modal";
import FoodForm, { type FoodFormValues } from "../components/FoodForm";
import SkeletonCard from "../components/SkeletonCard";
import Hero from "../components/Hero";
import {
  closeAdd,
  closeEdit,
  closeDelete,
  setGlobalLoading,
} from "../store/uiSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, error, searchTerm, page, limit, hasMore } =
    useAppSelector((s) => s.foods);
  const { modalAddOpen, modalEditId, modalDeleteId, globalLoading } =
    useAppSelector((s) => s.ui);

  useEffect(() => {
    dispatch(setStatus("loading"));
    dispatch(fetchFoods({ term: searchTerm, page, limit }))
      .unwrap()
      .then(() => dispatch(setError(null)))
      .catch((e) => dispatch(setError(e?.message ?? "Failed to load foods")));
  }, [dispatch, searchTerm, page, limit]);

  return (
    <>
      <Hero />
      <main className="food-container pb-10">
    <div className="my-16">
       <h2 className="text-3xl font-bold text-center">Featured Meals</h2>
    </div>
      {(status === "loading" || (status === "idle" && items.length === 0)) && (
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </section>
      )}

      {status !== "loading" && !(status === "idle" && items.length === 0) && items.length === 0 && !error && (
        <div className="empty-state-message text-zinc-600">
          {searchTerm?.trim()
            ? `No results for "${searchTerm.trim()}"`
            : "No items available"}
        </div>
      )}

      <FoodList items={items} />
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            className="food-btn inline-flex gap-2"
            onClick={() => dispatch(setPage(page + 1))}
            disabled={status === "loading"}
          >
            {status === "loading" && page > 1 && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
            )}
            {status === "loading" && page > 1 ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

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
              await dispatch(
                createFoodThunk({
                  name: values.food_name,
                  rating: values.food_rating,
                  image: values.food_image,
                  restaurant: {
                    name: values.restaurant_name,
                    logo: values.restaurant_logo,
                    status: values.restaurant_status,
                  },
                }),
              ).unwrap();
              dispatch(closeAdd());
            } finally {
              dispatch(setGlobalLoading(false));
            }
          }}
        />
      </Modal>

      <Modal
        open={!!modalEditId}
        onClose={() => dispatch(closeEdit())}
        title="Edit Food"
      >
        {modalEditId && (
          <FoodForm
            mode="edit"
            initial={items.find((f) => f.id === modalEditId)}
            onCancel={() => dispatch(closeEdit())}
            onSubmit={async (values: FoodFormValues) => {
              try {
                dispatch(setGlobalLoading(true));
                await dispatch(
                  updateFoodThunk({
                    id: modalEditId,
                    payload: {
                      name: values.food_name,
                      rating: values.food_rating,
                      image: values.food_image,
                      restaurant: {
                        name: values.restaurant_name,
                        logo: values.restaurant_logo,
                        status: values.restaurant_status,
                      },
                    },
                  }),
                ).unwrap();
                dispatch(closeEdit());
              } finally {
                dispatch(setGlobalLoading(false));
              }
            }}
          />
        )}
      </Modal>

      <Modal
        open={!!modalDeleteId}
        onClose={() => dispatch(closeDelete())}
        title="Delete Meal"
        className="max-w-2xl"
      >
        <div className="space-y-6"> 
          <p className="text-base text-gray-500">Are you sure you want to delete this meal? Actions cannot be reversed.</p>
          <div className="flex items-center justify-end gap-2">
           
            <button
              className="food-btn w-full text-white py-4 inline-flex gap-2 justify-center"
              onClick={async () => {
                if (!modalDeleteId) return;
                try {
                  dispatch(setGlobalLoading(true));
                  await dispatch(deleteFoodThunk(modalDeleteId)).unwrap();
                  dispatch(closeDelete());
                } finally {
                  dispatch(setGlobalLoading(false));
                }
              }}
              disabled={globalLoading}
              data-test-id="food-confirm-delete-btn"
            >
              {globalLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              )}
              {globalLoading ? "Deleting..." : "Yes"}
            </button>
             <button
              className="food-btn border w-full hover:bg-amber-100 bg-none border-amber-400 py-4 shadow-none text-black"
              onClick={() => dispatch(closeDelete())}
              disabled={globalLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      </main>
    </>
  );
}
