import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedProductPayload, IUser } from './dto';
export declare class DbService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    deleteProduct(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    verifyUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
        token: string;
    }>;
}
