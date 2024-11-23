import { LikePlaceService } from './like-place.service';
import { CreateLikePlaceDto } from './dto/create-like-place.dto';
export declare class LikePlaceController {
    private readonly likePlaceService;
    constructor(likePlaceService: LikePlaceService);
    create(createLikePlaceDto: CreateLikePlaceDto): Promise<{
        id: number;
        userId: number;
        placeId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
    }>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
