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

@Controller('caisse')
export class CaisseController {
  constructor(private readonly caisseService: CaisseService) {}

  @Post()
  async create(@Body() createCaisseDto: CreateCaisseDto) {
    return this.caisseService.create(createCaisseDto);
  }

  @Get()
  async findAll() {
    return this.caisseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.caisseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaisseDto: CreateCaisseDto,
  ) {
    return this.caisseService.update(id, updateCaisseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.caisseService.remove(id);
  }
  @Delete('removeByUniqueId/:id')
  async removeByUniqueId(@Param('id') id: string) {
    return this.caisseService.removeByUniqueId(id);
  }
}
