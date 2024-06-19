

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
    anomlyId?: string;
    anomlyDescription?: string;
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
    anomlyId?: string;
    anomlyDescription?: string;
}

type ProductStatus = "IN_STOCK" | "LOST" | "DAMAGED" | "INSPECTED" | "SHIPPED" | "ANOMLY"

export interface IUser {
    username: string;
    password: string;
    role?: roles;
}

export interface AuthenticatedUserPayload {
    data: IUser;
    token: string;
}

export interface IUserAdvanced {
    id: number;
    name: string;
    password: string;
    role: roles;
    createdAt: Date;
}

export interface IUserSearch {
    username? : string;
    role?: roles;
}

type roles = "ADMIN" | "WORKER" | "CONTROLLER"

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

export interface IAnomly {
    id: string;
    description: string;
    name: string;
}

export interface AuthenticatedAnomlyPayload {
    data: IAnomly;
    token: string;
}