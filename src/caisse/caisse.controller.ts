import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCaisseDto } from './dto/create-caisse.dto';
import { UpdateCaisseDto } from './dto/update-caisse.dto';
import { CaisseService } from './caisse.service';
import { CaisseNotificationsService } from './caisse-notifications.service';

@Controller('caisse')
export class CaisseController {
  constructor(
    private readonly caisseService: CaisseService,
    private readonly caisseNotificationsService: CaisseNotificationsService,
  ) {}

  @Post()
  async create(@Body() createCaisseDto: CreateCaisseDto) {
    return this.caisseService.create(createCaisseDto);
  }

  @Get()
  async findAll() {
    return this.caisseService.findAll();
  }

  @Get('notifications/all')
  async findAllNotifications() {
    return this.caisseNotificationsService.findAll();
  }

  @Get('notifications/unread-count')
  async getUnreadCount() {
    return this.caisseNotificationsService.getUnreadCount();
  }

  @Patch('notifications/:id/read')
  async markNotificationAsRead(@Param('id') id: string) {
    return this.caisseNotificationsService.markAsRead(id);
  }

  @Patch('notifications/:id/resolve')
  async resolveNotification(@Param('id') id: string) {
    return this.caisseNotificationsService.resolveById(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.caisseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaisseDto: UpdateCaisseDto,
  ) {
    return this.caisseService.update(id, updateCaisseDto);
  }

  @Delete('removeByUniqueId/:id')
  async removeByUniqueId(@Param('id') id: string) {
    return this.caisseService.removeByUniqueId(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.caisseService.remove(id);
  }
}