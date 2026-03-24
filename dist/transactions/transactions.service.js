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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("../schema/transaction.schema");
let TransactionsService = class TransactionsService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async create(createTransactionDto) {
        try {
            const payload = {
                date: createTransactionDto.date || new Date(),
                dateCreation: createTransactionDto.dateCreation || createTransactionDto.date || new Date(),
                typeStock: createTransactionDto.typeStock,
                type: createTransactionDto.type || createTransactionDto.typeStock,
                quantite: Number(createTransactionDto.quantite || 0),
                prix: Number(createTransactionDto.prix ??
                    createTransactionDto.prixFinal ??
                    0),
                prixFinal: Number(createTransactionDto.prixFinal ??
                    createTransactionDto.prix ??
                    0),
                motif: createTransactionDto.motif,
                details: createTransactionDto.details || '',
                commentaire: createTransactionDto.commentaire ||
                    createTransactionDto.details ||
                    '',
                proprietaireId: createTransactionDto.proprietaireId,
                clientNom: createTransactionDto.clientNom ||
                    createTransactionDto.nomPrenom ||
                    '',
                nomPrenom: createTransactionDto.nomPrenom ||
                    createTransactionDto.clientNom ||
                    '',
                operation: createTransactionDto.operation || 'retrait',
                clientId: createTransactionDto.clientId || null,
            };
            const newTransaction = new this.transactionModel(payload);
            return await newTransaction.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating transaction: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        const transactionsData = await this.transactionModel
            .find()
            .sort({ date: -1, createdAt: -1 })
            .exec();
        if (!transactionsData || transactionsData.length === 0) {
            return [];
        }
        return transactionsData;
    }
    async findOne(id) {
        const transactionData = await this.transactionModel.findById(id).exec();
        if (!transactionData) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found.`);
        }
        return transactionData;
    }
    async update(id, updateTransactionDto) {
        const payload = {
            ...updateTransactionDto,
        };
        if (payload.prix !== undefined) {
            payload.prix = Number(payload.prix);
        }
        if (payload.prixFinal !== undefined) {
            payload.prixFinal = Number(payload.prixFinal);
        }
        if (payload.quantite !== undefined) {
            payload.quantite = Number(payload.quantite);
        }
        const updatedTransaction = await this.transactionModel.findByIdAndUpdate(id, payload, { new: true });
        if (!updatedTransaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found for update.`);
        }
        return updatedTransaction;
    }
    async remove(id) {
        const deletedTransaction = await this.transactionModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedTransaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found for deletion.`);
        }
        return { message: `Transaction with ID ${id} deleted successfully.` };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map