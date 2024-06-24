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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbController = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
let DbController = class DbController {
    constructor(dbService) {
        this.dbService = dbService;
    }
    create(payload) {
        console.log('Commencing product creation');
        console.log('Payload:', payload);
        if (!payload.data) {
            throw new common_1.HttpException("Data was missing or malformed", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!payload.token) {
            throw new common_1.HttpException("Token was missing", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (typeof payload.data.quantity != "number") {
            throw new common_1.HttpException(`Quantity should be a Number (currently: ${typeof payload.data.quantity})`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException("Token was invalid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const productStatus = ['IN_STOCK', 'LOST', 'DAMAGED', 'INSPECTED', 'SHIPPED', 'ANOMLY'];
        if (!productStatus.includes(payload?.data?.status)) {
            throw new common_1.HttpException("Product status selected does not exist", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.dbService.createProduct(payload);
    }
    async createSubProduct(payload) {
        console.log('Commencing subproduct creation');
        console.log('Payload:', payload);
        if (!payload.product_id || !payload.subproduct_id) {
            throw new common_1.HttpException('Product ID and Subproduct ID are required', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!payload.token) {
            throw new common_1.HttpException('Token was missing', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException('Token was invalid', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return this.dbService.createSubProduct({ product_id: payload.product_id, subproduct_id: payload.subproduct_id });
    }
    async getAllSubProducts() {
        return this.dbService.getAllSubProducts();
    }
    put(payload) {
        console.log('Commencing product creation');
        console.log('Payload:', payload);
        if (!payload.data) {
            throw new common_1.HttpException("Data was missing or malformed", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!payload.token) {
            throw new common_1.HttpException("Token was missing", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (typeof payload.data.quantity != "number") {
            throw new common_1.HttpException(`Quantity should be a Number (currently: ${typeof payload.data.quantity})`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException("Token was invalid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const productStatus = ['IN_STOCK', 'LOST', 'DAMAGED', 'INSPECTED', 'SHIPPED', 'ANOMLY'];
        if (!productStatus.includes(payload?.data?.status)) {
            throw new common_1.HttpException("Product status selected does not exist", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.dbService.updateProduct(payload);
    }
    delete(payload) {
        console.log('Payload:', payload);
        console.log('Commencing product deletion');
        if (!payload.data) {
            throw new common_1.HttpException("Data was missing or malformed", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!payload.token) {
            throw new common_1.HttpException("Token was missing", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (typeof payload.data.quantity != "number") {
            throw new common_1.HttpException(`Quantity should be a Number (currently: ${typeof payload.data.quantity})`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException("Token was invalid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return this.dbService.deleteProduct(payload);
    }
    getAll(take, skip) {
        return this.dbService.getAll(take, skip);
    }
    searchProducts(payload) {
        if (!payload.token) {
            throw new common_1.HttpException("Token was missing", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException("Token was invalid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return this.dbService.searchProducts(payload);
    }
    verifyUser(payload) {
        return this.dbService.verifyUser(payload);
    }
    createUser(payload) {
        const roles = ['ADMIN', 'WORKER', 'CONTROLLER'];
        if (!roles.includes(payload?.data.role)) {
            throw new common_1.HttpException("Role selected does not exist", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.dbService.createUser(payload);
    }
    getAllUsers(take, skip, role) {
        return this.dbService.getAllUsers(take, skip, role);
    }
    searchUsers(payload) {
        if (!payload.token) {
            throw new common_1.HttpException("Token was missing", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const token = this.dbService.checkToken(payload.token);
        if (!token) {
            throw new common_1.HttpException("Token was invalid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return this.dbService.searchUsers(payload);
    }
    getAllAnomlies() {
        return this.dbService.getAnomlies();
    }
    createAnomly(payload) {
        return this.dbService.createAnomly(payload);
    }
    updateAnomly(payload) {
        return this.dbService.updateAnomly(payload);
    }
    deleteAnomly(payload) {
        return this.dbService.deleteAnomly(payload);
    }
    async statisticsAnomlies() {
        return await this.dbService.statisticsAnomlies();
    }
};
exports.DbController = DbController;
__decorate([
    (0, common_1.Post)('/products/handler'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/subProducts/handler'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DbController.prototype, "createSubProduct", null);
__decorate([
    (0, common_1.Get)('/subProducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "getAllSubProducts", null);
__decorate([
    (0, common_1.Put)('/products/handler'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)('/products/handler'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/products/getAll'),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/products/search'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Post)('/users/verify'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Post)('/users/create'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/users/getAll'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('/users/search'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('/anomly/getAll'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DbController.prototype, "getAllAnomlies", null);
__decorate([
    (0, common_1.Post)('/anomly/handler'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "createAnomly", null);
__decorate([
    (0, common_1.Put)('/anomly/handler'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "updateAnomly", null);
__decorate([
    (0, common_1.Delete)('/anomly/handler'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "deleteAnomly", null);
__decorate([
    (0, common_1.Get)('/statistics/anomlies'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DbController.prototype, "statisticsAnomlies", null);
exports.DbController = DbController = __decorate([
    (0, common_1.Controller)('db'),
    __metadata("design:paramtypes", [db_service_1.DbService])
], DbController);
//# sourceMappingURL=db.controller.js.map