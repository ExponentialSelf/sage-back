import { DbService } from './db.service';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    create(unique_id: string, receiver: string, quantity: number, reference: string, model: string, gate: string, supplier_code: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs> | {
        error: string;
    };
}
