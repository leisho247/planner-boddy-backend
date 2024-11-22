import { LikePlaceService } from '../services/like-place.service';
import { CreateLikePlaceDto } from '../dto/create-like-place.dto';
export declare class LikePlaceController {
    private readonly likePlaceService;
    constructor(likePlaceService: LikePlaceService);
    create(createLikePlaceDto: CreateLikePlaceDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
