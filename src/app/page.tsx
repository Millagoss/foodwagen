"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchFoods,
  setStatus,
  setError,
  setSearchTerm,
  createFoodThunk,
  updateFoodThunk,
  deleteFoodThunk,
} from "../store/foodsSlice";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import Modal from "../components/Modal";
import FoodForm, { type FoodFormValues } from "../components/FoodForm";
import {
  closeAdd,
  closeEdit,
  closeDelete,
  setGlobalLoading,
} from "../store/uiSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, error, searchTerm } = useAppSelector((s) => s.foods);
  const { modalAddOpen, modalEditId, modalDeleteId, globalLoading } =
    useAppSelector((s) => s.ui);

  useEffect(() => {
    dispatch(setStatus("loading"));
    dispatch(fetchFoods(searchTerm))
      .unwrap()
      .then(() => dispatch(setError(null)))
      .catch((e) => dispatch(setError(e?.message ?? "Failed to load foods")));
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
        title="Delete Food"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this food?</p>
          <div className="flex items-center justify-end gap-2">
            <button
              className="food-btn border"
              onClick={() => dispatch(closeDelete())}
            >
              Cancel
            </button>
            <button
              className="food-btn bg-red-600 text-white"
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
              data-test-id="food-confirm-delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
