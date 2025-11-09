export type RestaurantStatus = "Open Now" | "Closed";

export type Restaurant = {
	id?: string;
	name: string;
	logo: string;
	status: RestaurantStatus;
};

export type Food = {
	id: string;
	name: string;
	rating: number;
	image: string;
	restaurant?: Restaurant | null;
};

export type CreateFoodDTO = {
	name: string;
	rating: number;
	image: string;
	restaurant: {
		name: string;
		logo: string;
		status: RestaurantStatus;
	};
};

export type UpdateFoodDTO = Partial<Omit<CreateFoodDTO, "restaurant">> & {
	restaurant?: Partial<CreateFoodDTO["restaurant"]>;
};


