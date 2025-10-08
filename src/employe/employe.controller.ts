import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';

@Controller('employes')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  create(@Body() createEmployeDto: CreateEmployeDto) {
    return this.employeService.create(createEmployeDto);
  }

  @Get()
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employeService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeService.remove(id);
  }

  // ✅ Marquer la présence
  @Post(':id/presence')
  markPresence(@Param('id') id: string) {
    return this.employeService.markPresence(id);
  }

  // ✅ Calculer salaire sur une période donnée
  @Get(':id/salaire')
  calculSalaire(
    @Param('id') id: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    return this.employeService.calculSalaire(id, startDate, endDate);
  }
}
