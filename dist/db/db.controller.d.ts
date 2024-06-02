import { DbService } from './db.service';
import { AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserSearchPayload, IUser } from './dto';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    create(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    put(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    delete(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    getAll(take?: string, skip?: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    searchProducts(payload: AuthenticatedProductSearchPayload): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    verifyUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
        token: string;
    }>;
    createUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
    }>;
    getAllUsers(take?: number, skip?: number, role?: string): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
    searchUsers(payload: AuthenticatedUserSearchPayload): Promise<{
        message: string;
        ok: boolean;
        data: any;
    }>;
}
