

export interface IProduct {
    receiver: string;
    quantity: number;
    unique_id: string;
    reference: string;
    model: string;
    gate: string;
    supplier_code: string;
    username: string;
    status: ProductStatus
}

export interface IProductSearch {
    receiver?: string;
    quantity?: number;
    unique_id?: string;
    reference?: string;
    model?: string;
    gate?: string;
    supplier_code?: string;
    username?: string;
    status? : ProductStatus
}

type ProductStatus = "IN_STOCK" | "NO_LONGER_IN_STOCK"

export interface IUser {
    username: string;
    password: string;
    role?: roles;
}

export interface IUserSearch {
    username? : string;
    role?: roles;
}

type roles = "ADMIN" | "WORKER"

export interface AuthenticatedProductPayload {
    data: IProduct;
    token: string;
}

export interface AuthenticatedProductSearchPayload {
    data: IProductSearch;
    token: string;
}

export interface AuthenticatedUserSearchPayload {
    data: IUserSearch;
    token: string;
}
