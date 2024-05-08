import { DbService } from './db.service';
import { AuthenticatedProductPayload, IUser } from './dto';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    create(payload: AuthenticatedProductPayload): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    verifyUser(payload: IUser): Promise<{
        message: string;
        ok: boolean;
        token: string;
    }>;
}
