import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AchatBaseService } from './achat-base.service';
import { CreateAchatBaseDto, UpdateAchatBaseDto, TotalsAchatBaseDto } from './dto/achat.dto';
import { AchatBase } from '../schema/achat-base.schema.ts';

@Controller('achats-base') // Nouvelle route API
export class AchatBaseController {
    constructor(private readonly achatBaseService: AchatBaseService) {}

    @Get('totals')
    async getTotals(): Promise<TotalsAchatBaseDto> {
        return this.achatBaseService.getTotals();
    }

    @Post()
    async create(@Body() createAchatBaseDto: CreateAchatBaseDto): Promise<AchatBase> {
        return this.achatBaseService.create(createAchatBaseDto);
    }

    @Get()
    async findAll(): Promise<AchatBase[]> {
        return this.achatBaseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AchatBase> {
        return this.achatBaseService.findOne(id);
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAchatBaseDto: UpdateAchatBaseDto): Promise<AchatBase> {
        return this.achatBaseService.update(id, updateAchatBaseDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<AchatBase> {
        return this.achatBaseService.delete(id);
    }
}