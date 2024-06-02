import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserSearchPayload, IUser } from './dto';
export declare class DbService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    updateProduct(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    deleteProduct(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    searchProducts(payload: AuthenticatedProductSearchPayload): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    getAll(take?: string, skip?: string): Prisma.PrismaPromise<{
        id: number;
        receiver: string;
        quantity: number;
        unique_id: string;
        reference: string;
        model: string;
        gate: string;
        supplier_code: string;
        username: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    verifyUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
        token: string;
    }>;
    createUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
    }>;
    getAllUsers(take: any, skip: number, role: any): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    searchUsers(payload: AuthenticatedUserSearchPayload): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    createToken(response: any): Promise<any>;
    checkToken(token: any): Promise<boolean>;
}
