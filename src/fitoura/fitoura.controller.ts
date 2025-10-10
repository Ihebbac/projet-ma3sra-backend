import { Controller, Post, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { FitouraService } from './fitoura.service';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto.ts';

@Controller('fitoura')
export class FitouraController {
  constructor(private readonly fitouraService: FitouraService) {}

  @Post('entree')
  createEntree(@Body() dto: CreateFitouraDto) {
    return this.fitouraService.enregistrerEntree(dto);
  }

  // Méthode existante (sortie)
  @Put('sortie/:id')
  updateSortie(@Param('id') id: string, @Body() dto: UpdateFitouraDto) {
    return this.fitouraService.enregistrerSortie(id, dto);
  }

  // ✅ Nouvelle méthode de mise à jour manuelle
  @Put('modifier/:id')
  modifierFitouraManuellement(@Param('id') id: string, @Body() dto: UpdateFitouraManuelleDto) {
    return this.fitouraService.modifierFitouraManuellement(id, dto);
  }

  @Get()
  findAll() {
    return this.fitouraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitouraService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.fitouraService.delete(id);
  }
}
