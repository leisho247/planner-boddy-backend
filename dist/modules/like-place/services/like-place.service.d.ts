import { CreateLikePlaceDto } from '../dto/create-like-place.dto';
import { UpdateLikePlaceDto } from '../dto/update-like-place.dto';
export declare class LikePlaceService {
    create(createLikePlaceDto: CreateLikePlaceDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLikePlaceDto: UpdateLikePlaceDto): string;
    remove(id: number): string;
}
