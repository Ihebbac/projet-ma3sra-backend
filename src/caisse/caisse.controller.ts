import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateCaisseDto } from './dto/create-caisse.dto';
import { CaisseService } from './caisse.service';
import { UpdateCaissetDto } from './dto/update-Caisse.dto';

@Controller('caisse')
export class CaisseController {
  constructor(private readonly CaisseService: CaisseService) {}

  @Post()
  async create(@Body() createCaisseDto: CreateCaisseDto) {
    return this.CaisseService.create(createCaisseDto);
  }

  @Get()
  async findAll() {
    return this.CaisseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.CaisseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaisseDto: UpdateCaissetDto,
  ) {
    return this.CaisseService.update(id, updateCaisseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.CaisseService.remove(id);
  }
}
