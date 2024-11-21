import { CreateDislikedMealDto } from './dto/create-disliked-meal.dto';
import { UpdateDislikedMealDto } from './dto/update-disliked-meal.dto';
export declare class DislikedMealService {
    create(createDislikedMealDto: CreateDislikedMealDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDislikedMealDto: UpdateDislikedMealDto): string;
    remove(id: number): string;
}
