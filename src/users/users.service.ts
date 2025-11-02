// src/users/users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    const exists = await this.userModel.exists({
      email: dto.email.toLowerCase(),
    });
    if (exists) throw new ConflictException('Email déjà utilisé');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const doc = await this.userModel.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      phone: dto.phone,
      roles: dto.roles?.length ? dto.roles : ['user'],
      passwordHash,
    });
    return this.sanitize(doc);
  }

  async findAll() {
    const users = await this.userModel.find().lean();
    return users.map(this.sanitizeLean);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return this.sanitize(user);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  async update(id: number, dto: CreateUserDto) {
    // à adapter si tu utilises un id string (ObjectId)
    throw new Error('Not implemented');
  }

  async remove(id: number) {
    throw new Error('Not implemented');
  }

  sanitize(u: UserDocument) {
    return {
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      phone: u.phone,
      roles: u.roles,
      createdAt: (u as any).createdAt,
      updatedAt: (u as any).updatedAt,
    };
  }

  sanitizeLean = (u: any) => ({
    id: u._id?.toString?.() ?? u._id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    roles: u.roles,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  });
}
