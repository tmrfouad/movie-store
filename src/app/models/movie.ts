import { Category } from './category';

export interface Movie {
    id?: number;
    title?: string;
    budget?: number;
    year?: number;
    created_at?: Date;
    updated_at?: Date;
    category_ids?: number[];

    categories?: Category[];
}