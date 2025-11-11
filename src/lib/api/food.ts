import { api } from "../axios";
import type { CreateFoodDTO, Food, UpdateFoodDTO } from "../../types/food";

const basePath = "/Food";

type PageOpts = { page?: number; limit?: number };

export async function listFoods(opts: PageOpts = {}): Promise<Food[]> {
	const { page = 1, limit = 10 } = opts;
	const { data } = await api.get<Food[]>(basePath, { params: { page, limit } });
	return data;
}

export async function searchFoods(name: string, opts: PageOpts = {}): Promise<Food[]> {
	const { page = 1, limit = 10 } = opts;
	const { data } = await api.get<Food[]>(`${basePath}`, {
		params: { name, page, limit },
	});
	return data;
}

export async function createFood(payload: CreateFoodDTO): Promise<Food> {
  const { data } = await api.post<Food>(basePath, payload);
  return data;
}

export async function updateFood(
  id: string,
  payload: UpdateFoodDTO,
): Promise<Food> {
  const { data } = await api.put<Food>(`${basePath}/${id}`, payload);
  return data;
}

export async function deleteFood(id: string): Promise<{ id: string }> {
  const { data } = await api.delete<{ id: string }>(`${basePath}/${id}`);
  return data;
}
