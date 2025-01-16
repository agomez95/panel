export interface Brand {
    id: number;
    name: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBrand {
    name: string;
    state: boolean;
}
  
export interface UpdateBrand {
    id: number;
    name?: string;
    state?: boolean;
}
  