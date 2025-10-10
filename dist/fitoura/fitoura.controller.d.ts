import { FitouraService } from './fitoura.service';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto.ts';
export declare class FitouraController {
    private readonly fitouraService;
    constructor(fitouraService: FitouraService);
    createEntree(dto: CreateFitouraDto): Promise<import("../interfaces/fitoura.interface").FitouraInterface>;
    updateSortie(id: string, dto: UpdateFitouraDto): Promise<import("../interfaces/fitoura.interface").FitouraInterface>;
    modifierFitouraManuellement(id: string, dto: UpdateFitouraManuelleDto): Promise<import("../interfaces/fitoura.interface").FitouraInterface>;
    findAll(): Promise<import("../interfaces/fitoura.interface").FitouraInterface[]>;
    findOne(id: string): Promise<import("../interfaces/fitoura.interface").FitouraInterface>;
    delete(id: string): Promise<void>;
}
