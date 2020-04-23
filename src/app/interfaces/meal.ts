export interface Meal {
    name: string;
    description: string;
    allergen?: string;
    weight?: string;
    price: number;
    photo?: string;
    orderQuantity?: number;
    packaging?: number;
    sideDish?: SideDish;
}

export interface SideDish {
    name: string;
    description: string;
    price: number;
    photo?: string;
}