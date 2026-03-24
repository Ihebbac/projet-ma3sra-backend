import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { EmployeService } from './employe.service'
import { CreateEmployeDto } from './dto/create-employe.dto'
import { UpdateEmployeDto } from './dto/update-employe.dto'

@Controller('employes')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  create(@Body() dto: CreateEmployeDto) {
    return this.employeService.create(dto)
  }
@Put(':id/payer')
payer(@Param('id') id: string, @Body() body: { date: string; heuresSup?: number; mode?: 'CAISSE'|'NOTE'; commentaire?: string; montant?: number }) {
  return this.employeService.marquerJourCommePaye(id, body)
}
  @Get()
  findAll() {
    return this.employeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeDto) {
    return this.employeService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeService.remove(id)
  }

  @Post(':id/absence')
  addAbsence(
    @Param('id') id: string,
    @Body() body: { date: string; motif?: string; type?: 'ABSENT' | 'CONGE_NON_PAYE' },
  ) {
    return this.employeService.addAbsence(id, body.date, body.motif, body.type ?? 'ABSENT')
  }

  @Delete(':id/absence')
  removeAbsence(@Param('id') id: string, @Query('date') date: string) {
    return this.employeService.removeAbsence(id, date)
  }

  @Post(':id/avance')
  addAdvance(
    @Param('id') id: string,
    @Body() body: { date: string; montant: number; mode: 'CAISSE' | 'NOTE'; note?: string },
  ) {
    return this.employeService.addAdvance(id, body)
  }

  @Get(':id/resume')
  resume(@Param('id') id: string, @Query('month') month: string) {
    return this.employeService.resumeMensuel(id, month)
  }

  @Get('resume/all')
  resumeAll(@Query('month') month: string) {
    return this.employeService.resumeMensuelAll(month)
  }
}