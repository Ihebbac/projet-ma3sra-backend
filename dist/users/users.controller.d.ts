import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        roles: string[];
        createdAt: any;
        updatedAt: any;
    }>;
    findAll(): Promise<{
        id: any;
        name: any;
        email: any;
        phone: any;
        roles: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        roles: string[];
        createdAt: any;
        updatedAt: any;
    }>;
    remove(id: string): Promise<void>;
}
