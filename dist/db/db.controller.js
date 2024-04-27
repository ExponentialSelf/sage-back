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
    create(unique_id, receiver, quantity, reference, model, gate, supplier_code) {
        if (!unique_id) {
            return {
                error: 'unique_id is required'
            };
        }
        if (!quantity) {
            return {
                error: 'quantity is required'
            };
        }
        if (!reference) {
            return {
                error: 'reference is required'
            };
        }
        if (!model) {
            return {
                error: 'model is required'
            };
        }
        if (!gate) {
            return {
                error: 'gate is required'
            };
        }
        if (!supplier_code) {
            return {
                error: 'supplier_code is required'
            };
        }
        const payload = {
            unique_id,
            receiver,
            quantity: Number(quantity),
            reference,
            model,
            gate,
            supplier_code
        };
        return this.dbService.createProduct(payload);
    }
};
exports.DbController = DbController;
__decorate([
    (0, common_1.Get)('/create/product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('receiver')),
    __param(2, (0, common_1.Query)('quantity')),
    __param(3, (0, common_1.Query)('reference')),
    __param(4, (0, common_1.Query)('model')),
    __param(5, (0, common_1.Query)('gate')),
    __param(6, (0, common_1.Query)('supplier_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DbController.prototype, "create", null);
exports.DbController = DbController = __decorate([
    (0, common_1.Controller)('db'),
    __metadata("design:paramtypes", [db_service_1.DbService])
], DbController);
//# sourceMappingURL=db.controller.js.map