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
    async createProduct(payload) {
        const res = {
            message: "",
            payload: payload,
            result: undefined
        };
        const token = await this.prisma.token.findFirst({
            where: {
                token: payload.token
            }
        });
        if (!token) {
            res.message = "Token is invalid";
            throw new common_1.HttpException(res, common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const data = payload.data;
            console.log(data);
            const result = await this.prisma.product.create({
                data: payload.data
            });
            res.result = result;
            res.message = "Product created";
            return res;
        }
        catch (err) {
            res.message = "Product already exists";
            throw new common_1.HttpException({ res, err }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProduct(payload) {
        const res = {
            message: "",
            payload: payload,
            result: undefined
        };
        const token = await this.prisma.token.findFirst({
            where: {
                token: payload.token
            }
        });
        if (!token) {
            res.message = "Token is invalid";
            throw new common_1.HttpException(res, common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.prisma.product.delete({
                where: {
                    unique_id: payload.data.unique_id
                }
            });
            console.log(result);
            console.log(Object.values(result).length == 0);
            res.result = result;
            res.message = "Product found";
            return res;
        }
        catch (err) {
            res.message = "Product not found";
            throw new common_1.HttpException({ res, err }, common_1.HttpStatus.BAD_REQUEST);
        }
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
            ok: false,
            token: ""
        };
        const encrypted_pass = jwt.sign(payload.password, secrets_1.Secret.JWT_TOKEN, { algorithm: 'HS256' });
        console.log(encrypted_pass);
        console.log(payload);
        const response = await this.prisma.worker.findFirstOrThrow({
            where: {
                password: encrypted_pass,
                AND: {
                    name: payload.username
                }
            }
        }).then(async (response) => {
            res.message = "Login successful";
            res.ok = true;
            const date = (new Date()).toString();
            const tokenization = jwt.sign(date, secrets_1.Secret.JWT_TOKEN, { algorithm: 'HS256' });
            res.token = tokenization;
            const token = await this.prisma.token.upsert({
                create: {
                    token: tokenization,
                    workerId: Number(response.id)
                },
                update: {
                    token: tokenization
                },
                where: {
                    id: Number(response.id)
                }
            });
            console.log({ token });
            return res;
        })
            .catch((err) => {
            console.log(err);
            res.message = "Login unsuccessful";
            res.ok = false;
            throw new common_1.HttpException(res, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(response);
        return response;
    }
};
exports.DbService = DbService;
exports.DbService = DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DbService);
//# sourceMappingURL=db.service.js.map