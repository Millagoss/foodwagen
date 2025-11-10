"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Food, RestaurantStatus } from "../types/food";

const schema = z.object({
	food_name: z.string().min(1, "Food Name is required"),
	food_rating: z
		.coerce.number()
		.min(1, "Food Rating must be between 1 and 5")
		.max(5, "Food Rating must be between 1 and 5"),
	food_image: z.string().url("Food Image URL is required"),
	restaurant_name: z.string().min(1, "Restaurant Name is required"),
	restaurant_logo: z.string().url("Restaurant Logo URL is required"),
	restaurant_status: z.enum(["Open Now", "Closed"]),
});

export type FoodFormValues = z.infer<typeof schema>;

type Props = {
	initial?: Partial<Food>;
	mode: "add" | "edit";
	onSubmit: (values: FoodFormValues) => Promise<void>;
	onCancel: () => void;
};

export default function FoodForm({ initial, mode, onSubmit, onCancel }: Props) {
	const [submitting, setSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FoodFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			food_name: initial?.name ?? "",
			food_rating: (initial?.rating as number) ?? ("" as unknown as number),
			food_image: initial?.image ?? "",
			restaurant_name: initial?.restaurant?.name ?? "",
			restaurant_logo: initial?.restaurant?.logo ?? "",
			restaurant_status: (initial?.restaurant?.status as RestaurantStatus) ?? "Open Now",
		},
	});

	const submit = handleSubmit(async (values) => {
		setSubmitting(true);
		try {
			await onSubmit(values);
			reset();
		} finally {
			setSubmitting(false);
		}
	});

	return (
		<form onSubmit={submit} className="space-y-4" data-test-id="food-form">
			<div>
				<label htmlFor="food_name" className="mb-1 block text-sm font-medium">
					Food Name
				</label>
				<input
					{...register("food_name")}
					id="food_name"
					name="food_name"
					className="food-input"
					placeholder="Enter food name"
					aria-describedby={errors.food_name ? "food-name-error" : undefined}
				/>
				{errors.food_name && (
					<p id="food-name-error" className="mt-1 text-sm text-red-600">
						Food Name is required
					</p>
				)}
			</div>

			<div>
				<label htmlFor="food_rating" className="mb-1 block text-sm font-medium">
					Food Rating
				</label>
				<input
					{...register("food_rating", { valueAsNumber: true })}
					id="food_rating"
					name="food_rating"
					type="number"
					className="food-input"
					placeholder="Enter food rating"
					aria-describedby={errors.food_rating ? "food-rating-error" : undefined}
				/>
				{errors.food_rating && (
					<p id="food-rating-error" className="mt-1 text-sm text-red-600">
						Food Rating must be a number
					</p>
				)}
			</div>

			<div>
				<label htmlFor="food_image" className="mb-1 block text-sm font-medium">
					Food Image URL
				</label>
				<input
					{...register("food_image")}
					id="food_image"
					name="food_image"
					className="food-input"
					placeholder="Enter food image url"
					aria-describedby={errors.food_image ? "food-image-error" : undefined}
				/>
				{errors.food_image && (
					<p id="food-image-error" className="mt-1 text-sm text-red-600">
						Food Image URL is required
					</p>
				)}
			</div>

			<div>
				<label htmlFor="restaurant_name" className="mb-1 block text-sm font-medium">
					Restaurant Name
				</label>
				<input
					{...register("restaurant_name")}
					id="restaurant_name"
					name="restaurant_name"
					className="food-input"
					placeholder="Enter restaurant name"
					aria-describedby={errors.restaurant_name ? "restaurant-name-error" : undefined}
				/>
				{errors.restaurant_name && (
					<p id="restaurant-name-error" className="mt-1 text-sm text-red-600">
						Restaurant Name is required
					</p>
				)}
			</div>

			<div>
				<label htmlFor="restaurant_logo" className="mb-1 block text-sm font-medium">
					Restaurant Logo URL
				</label>
				<input
					{...register("restaurant_logo")}
					id="restaurant_logo"
					name="restaurant_logo"
					className="food-input"
					placeholder="Enter restaurant logo url"
					aria-describedby={errors.restaurant_logo ? "restaurant-logo-error" : undefined}
				/>
				{errors.restaurant_logo && (
					<p id="restaurant-logo-error" className="mt-1 text-sm text-red-600">
						Restaurant Logo URL is required
					</p>
				)}
			</div>

			<div>
				<label htmlFor="restaurant_status" className="mb-1 block text-sm font-medium">
					Restaurant Status
				</label>
				<select
					{...register("restaurant_status")}
					id="restaurant_status"
					name="restaurant_status"
					className="food-input"
					aria-describedby={errors.restaurant_status ? "restaurant-status-error" : undefined}
				>
					<option value="Open Now">Open Now</option>
					<option value="Closed">Closed</option>
				</select>
				{errors.restaurant_status && (
					<p id="restaurant-status-error" className="mt-1 text-sm text-red-600">
						Restaurant Status must be ‘Open Now’ or ‘Closed’
					</p>
				)}
			</div>

			<div className="mt-6 flex items-center justify-end gap-3">
				<button type="button" className="food-btn border" onClick={onCancel}>
					Cancel
				</button>
				<button
					type="submit"
					className="food-btn bg-black text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-black"
					disabled={submitting}
				>
					{submitting ? (mode === "add" ? "Adding Food..." : "Updating Food...") : "Save"}
				</button>
			</div>
		</form>
	);
}


