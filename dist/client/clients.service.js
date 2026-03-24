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
const crypto_1 = require("crypto");
const client_schema_1 = require("../schema/client.schema");
const caisse_service_1 = require("../caisse/caisse.service");
let ClientsService = class ClientsService {
    constructor(clientModel, caisseService) {
        this.clientModel = clientModel;
        this.caisseService = caisseService;
    }
    generatePublicTrackingToken() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    buildPublicTrackingResponse(client) {
        const quantiteHuile = Number(client.quantiteHuile || 0);
        const statusHuile = quantiteHuile > 0 ? 'Prêt' : 'En cours';
        return {
            nomPrenom: client.nomPrenom,
            dateCreation: client.dateCreation,
            quantiteOlive: client.quantiteOlive,
            quantiteOliveNet: client.quantiteOliveNet,
            quantiteHuile: client.quantiteHuile,
            kattou3: client.kattou3,
            prixFinal: client.prixFinal,
            statusHuile,
        };
    }
    ensureTrackingAccessAllowed(client) {
        if (!client) {
            throw new common_1.NotFoundException('Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.');
        }
        if (!client.publicTrackingToken) {
            throw new common_1.NotFoundException('Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.');
        }
        if (client.trackingEnabled !== true) {
            throw new common_1.NotFoundException('Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.');
        }
        if (client.status === 'payé') {
            throw new common_1.NotFoundException('Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.');
        }
    }
    async create(createClientDto) {
        try {
            const initialStatus = createClientDto.status ?? 'non payé';
            const newClient = new this.clientModel({
                ...createClientDto,
                publicTrackingToken: this.generatePublicTrackingToken(),
                trackingEnabled: initialStatus !== 'payé',
            });
            return await newClient.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating Client: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return await this.clientModel.find().exec();
    }
    async findOne(id) {
        const clientData = await this.clientModel.findById(id).exec();
        if (!clientData) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found.`);
        }
        let shouldSave = false;
        if (!clientData.publicTrackingToken) {
            clientData.publicTrackingToken = this.generatePublicTrackingToken();
            shouldSave = true;
        }
        if (typeof clientData.trackingEnabled !== 'boolean') {
            clientData.trackingEnabled = clientData.status !== 'payé';
            shouldSave = true;
        }
        if (shouldSave) {
            await clientData.save();
        }
        return clientData;
    }
    async findPublicTrackingByToken(token) {
        const client = await this.clientModel
            .findOne({
            publicTrackingToken: token,
        })
            .exec();
        this.ensureTrackingAccessAllowed(client);
        return this.buildPublicTrackingResponse(client);
    }
    async updateStatus(id, status) {
        const client = await this.clientModel.findById(id).exec();
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found.`);
        }
        const previousStatus = client.status;
        client.status = status;
        client.trackingEnabled = status !== 'payé';
        if (!client.publicTrackingToken) {
            client.publicTrackingToken = this.generatePublicTrackingToken();
        }
        const updatedClient = await client.save();
        if (previousStatus === 'payé' && status === 'non payé') {
            await this.caisseService.invalidateClientPayment({
                uniqueId: String(client._id),
                clientId: String(client._id),
                clientName: client.nomPrenom,
                phone: client.numTelephone,
                createdDate: client.dateCreation,
                reason: 'Le client a été remis en non payé après validation du paiement.',
            });
        }
        return updatedClient;
    }
    async update(id, updateClientDto) {
        const existingClient = await this.clientModel.findById(id).exec();
        if (!existingClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for update.`);
        }
        const previousStatus = existingClient.status;
        const updatedClient = await this.clientModel
            .findByIdAndUpdate(id, updateClientDto, { new: true })
            .exec();
        if (!updatedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for update.`);
        }
        let shouldSave = false;
        if (!updatedClient.publicTrackingToken) {
            updatedClient.publicTrackingToken = this.generatePublicTrackingToken();
            shouldSave = true;
        }
        const expectedTrackingEnabled = updatedClient.status !== 'payé';
        if (updatedClient.trackingEnabled !== expectedTrackingEnabled) {
            updatedClient.trackingEnabled = expectedTrackingEnabled;
            shouldSave = true;
        }
        if (shouldSave) {
            await updatedClient.save();
        }
        if (previousStatus === 'payé' && updatedClient.status === 'non payé') {
            await this.caisseService.invalidateClientPayment({
                uniqueId: String(updatedClient._id),
                clientId: String(updatedClient._id),
                clientName: updatedClient.nomPrenom,
                phone: updatedClient.numTelephone,
                createdDate: updatedClient.dateCreation,
                reason: 'Le client a été remis en non payé après validation du paiement.',
            });
        }
        return updatedClient;
    }
    async remove(id) {
        const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
        if (!deletedClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found for deletion.`);
        }
        await this.caisseService.resolveNotificationsOnlyByUniqueId(String(deletedClient._id), 'client-deleted');
        return { message: `Client with ID ${id} deleted successfully.` };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        caisse_service_1.CaisseService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map