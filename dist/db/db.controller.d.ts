import { DbService } from './db.service';
import { IProduct, IUser } from './dto';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    create(payload: IProduct): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    }>;
}
