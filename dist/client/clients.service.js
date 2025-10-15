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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("../schema/client.schema");
let ClientsService = class ClientsService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async create(createClientDto) {
        try {
            const newClient = new this.clientModel(createClientDto);
            return await newClient.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating client: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        const clientsData = await this.clientModel.find().exec();
        if (!clientsData || clientsData.length === 0) {
            throw new common_1.NotFoundException('No clients found in the collection.');
        }
        return clientsData;
    }
    async findOne(id) {
        const clientData = await this.clientModel.findById(id).exec();
        if (!clientData) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found.`);
        }
        return clientData;
    }
    async update(id, updateClientDto) {
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true });
        if (!updatedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for update.`);
        }
        return updatedClient;
    }
    async updateStatus(id, status) {
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for status update.`);
        }
        return updatedClient;
    }
    async remove(id) {
        const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
        if (!deletedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for deletion.`);
        }
        return { message: `Client with ID ${id} deleted successfully.` };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClientsService);
//# sourceMappingURL=clients.service.js.map