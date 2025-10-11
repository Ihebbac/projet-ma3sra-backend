import { ProprietairesService } from './prop.service';
import { CreateProprietaireDto } from './dto/create-prop.dto';
import { UpdateProprietaireDto } from './dto/update-prop.dto';
export declare class ProprietairesController {
    private readonly proprietairesService;
    constructor(proprietairesService: ProprietairesService);
    create(createProprietaireDto: CreateProprietaireDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProprietaireDto: UpdateProprietaireDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    updateStock(id: string, body: {
        type: 'huile' | 'olive';
        quantite: number;
        operation: 'ajout' | 'retrait';
    }): Promise<any>;
}
