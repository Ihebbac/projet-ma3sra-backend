import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException 
} from '@nestjs/common';
import { ProprietairesService } from './prop.service';
import { CreateProprietaireDto } from './dto/create-prop.dto';
import { UpdateProprietaireDto } from './dto/update-prop.dto';

@Controller('proprietaires') 
export class ProprietairesController {
  constructor(private readonly proprietairesService: ProprietairesService) {}

  @Post()
  async create(@Body() createProprietaireDto: CreateProprietaireDto) {
    return this.proprietairesService.create(createProprietaireDto);
  }

  @Get()
  async findAll() {
    return this.proprietairesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.proprietairesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProprietaireDto: UpdateProprietaireDto,
  ) {
    return this.proprietairesService.update(id, updateProprietaireDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.proprietairesService.remove(id);
  }
}