

export interface IProduct {
    receiver: string;
    quantity: number;
    unique_id: string;
    reference: string;
    model: string;
    gate: string;
    supplier_code: string;
}

export interface IUser {
    username: string;
    password: string;
}

export interface AuthenticatedProductPayload {
    data: IProduct;
    token: string;
}
