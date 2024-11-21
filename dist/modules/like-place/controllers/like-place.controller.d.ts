import { LikePlaceService } from './services/like-place.service';
import { CreateLikePlaceDto } from './dto/create-like-place.dto';
import { UpdateLikePlaceDto } from './dto/update-like-place.dto';
export declare class LikePlaceController {
    private readonly likePlaceService;
    constructor(likePlaceService: LikePlaceService);
    create(createLikePlaceDto: CreateLikePlaceDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateLikePlaceDto: UpdateLikePlaceDto): any;
    remove(id: string): any;
}
