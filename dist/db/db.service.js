"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = require("jsonwebtoken");
const secrets_1 = require("../secrets");
let DbService = class DbService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createProduct(payload) {
        const result = this.prisma.product.create({
            data: payload
        });
        return result;
    }
    getAll(take, skip) {
        return this.prisma.product.findMany({
            skip: Number(skip),
            take: Number(take),
            orderBy: {
                model: 'asc'
            }
        });
    }
    async verifyUser(payload) {
        let res = {
            message: "",
            ok: false
        };
        const encrypted_pass = jwt.sign(payload.password, secrets_1.Secret.JWT_TOKEN, { algorithm: 'HS256' });
        console.log(encrypted_pass);
        const response = await this.prisma.worker.findFirstOrThrow({
            where: {
                password: encrypted_pass,
                AND: {
                    name: payload.username
                }
            }
        }).then((response) => {
            res.message = "Login successful";
            res.ok = true;
        })
            .catch((err) => {
            res.message = "Login unsuccessful";
            res.ok = false;
            throw new common_1.HttpException(res, common_1.HttpStatus.NOT_FOUND);
        });
        throw new common_1.HttpException(res, common_1.HttpStatus.FOUND);
        return res;
    }
};
exports.DbService = DbService;
exports.DbService = DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DbService);
//# sourceMappingURL=db.service.js.map