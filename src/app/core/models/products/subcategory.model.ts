export interface Subcategory {
    id: number;
    name: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    category_id: number;
}

export interface CreateSubcategory {
    name: string;
    state: boolean;
    category_id: number;
}

export interface UpdateSubcategory {
    id: number;
    name?: string;
    state?: boolean;
    category_id?: number;
}