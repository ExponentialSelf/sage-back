import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedAnomlyPayload, AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserPayload, AuthenticatedUserSearchPayload, IUser, IUserAdvanced } from './dto';
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
        anomlyId: string;
        anomalyDescription: string;
        reported: boolean;
    }[]>;
    verifyUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
        token: string;
    }>;
    createUser(payload: AuthenticatedUserPayload): Promise<{
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
    createSubProduct(data: {
        product_id: string;
        subproduct_id: string;
    }): Promise<any>;
    getAllSubProducts(): Promise<any>;
    getAnomlies(): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    createAnomly(payload: AuthenticatedAnomlyPayload): Promise<{
        message: string;
        payload: AuthenticatedAnomlyPayload;
        result: any;
    }>;
    updateAnomly(payload: AuthenticatedAnomlyPayload): Promise<{
        message: string;
        payload: AuthenticatedAnomlyPayload;
        result: any;
    }>;
    deleteAnomly(payload: AuthenticatedAnomlyPayload): Promise<{
        message: string;
        payload: AuthenticatedAnomlyPayload;
        result: any;
    }>;
    statisticsAnomlies(): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    createToken(response: IUserAdvanced): Promise<any>;
    checkToken(token: any): Promise<boolean>;
}
