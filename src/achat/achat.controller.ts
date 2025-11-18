import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AchatService } from './achat.service';
import { CreateAchatDto, UpdateAchatDto, TotalsDto } from './dto/achat.dto';
import { Achat } from '../schema/achat.schema';

@Controller('achats')
export class AchatController {
    constructor(private readonly achatService: AchatService) {}

    // GET /achats/totals - Récupérer les totaux cumulés
    @Get('totals')
    async getTotals(): Promise<TotalsDto> {
        return this.achatService.getTotals();
    }

    // POST /achats - Créer un nouvel achat
    @Post()
    async create(@Body() createAchatDto: CreateAchatDto): Promise<Achat> {
        return this.achatService.create(createAchatDto);
    }

    // GET /achats - Récupérer tous les achats
    @Get()
    async findAll(): Promise<Achat[]> {
        return this.achatService.findAll();
    }

    // GET /achats/:id - Récupérer un achat par ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Achat> {
        return this.achatService.findOne(id);
    }
    
    // PUT /achats/:id - Mettre à jour un achat
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAchatDto: UpdateAchatDto): Promise<Achat> {
        return this.achatService.update(id, updateAchatDto);
    }

    // DELETE /achats/:id - Supprimer un achat
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Achat> {
        return this.achatService.delete(id);
    }
}