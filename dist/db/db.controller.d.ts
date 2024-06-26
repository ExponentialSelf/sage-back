import { DbService } from './db.service';
import { AuthenticatedAnomlyPayload, AuthenticatedProductPayload, AuthenticatedProductSearchPayload, AuthenticatedUserPayload, AuthenticatedUserSearchPayload, IUser } from './dto';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    create(payload: AuthenticatedProductPayload): Promise<{
        message: string;
        payload: AuthenticatedProductPayload;
        result: any;
    }>;
    createSubProduct(payload: any): Promise<any>;
    getAllSubProducts(): Promise<any>;
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
        anomlyId: string;
        anomalyDescription: string;
        reported: boolean;
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
    createUser(payload: AuthenticatedUserPayload): Promise<{
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
    getAllAnomlies(): Promise<{
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
}
