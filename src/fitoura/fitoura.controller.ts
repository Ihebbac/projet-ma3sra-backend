import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FitouraService } from './fitoura.service';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto';

function editFileName(
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileExtName = extname(file.originalname);
  const baseName = file.originalname
    .replace(fileExtName, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]/g, '');

  callback(null, `${baseName}-${uniqueSuffix}${fileExtName}`);
}

function fileFilter(
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  callback(null, true);
}

@Controller('fitoura')
export class FitouraController {
  constructor(private readonly fitouraService: FitouraService) {}

  @Post('entree')
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      storage: diskStorage({
        destination: './uploads/fitoura',
        filename: editFileName,
      }),
      fileFilter,
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  createEntree(
    @Body() dto: CreateFitouraDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.fitouraService.enregistrerEntree(dto, files || []);
  }

  @Put('sortie/:id')
  updateSortie(@Param('id') id: string, @Body() dto: UpdateFitouraDto) {
    return this.fitouraService.enregistrerSortie(id, dto);
  }

  @Put('modifier/:id')
  modifierFitouraManuellement(
    @Param('id') id: string,
    @Body() dto: UpdateFitouraManuelleDto,
  ) {
    return this.fitouraService.modifierFitouraManuellement(id, dto);
  }

  @Post(':id/attachments')
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      storage: diskStorage({
        destination: './uploads/fitoura',
        filename: editFileName,
      }),
      fileFilter,
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  addAttachments(
    @Param('id') id: string,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.fitouraService.addAttachments(id, files || []);
  }

  @Delete(':id/attachments/:attachmentId')
  removeAttachment(
    @Param('id') id: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    return this.fitouraService.removeAttachment(id, attachmentId);
  }

  @Get('options/camions')
  searchCamions(@Query('search') search?: string) {
    return this.fitouraService.searchCamions(search || '');
  }

  @Get('options/chauffeurs')
  searchChauffeurs(@Query('search') search?: string) {
    return this.fitouraService.searchChauffeurs(search || '');
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