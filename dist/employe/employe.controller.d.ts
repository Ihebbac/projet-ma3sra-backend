import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
export declare class EmployeController {
    private readonly employeService;
    constructor(employeService: EmployeService);
    create(createEmployeDto: CreateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    findAll(): Promise<import("../schema/employe.schema").Employe[]>;
    findOne(id: string): Promise<import("../schema/employe.schema").Employe>;
    updatePut(id: string, updateEmployeDto: UpdateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    updatePatch(id: string, updateEmployeDto: UpdateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    remove(id: string): Promise<void>;
    markPresence(id: string): Promise<import("../schema/employe.schema").Employe>;
    calculSalaire(id: string, start?: string, end?: string): Promise<number>;
}
