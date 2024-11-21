import { DislikedMealService } from '../services/disliked-meal.service';
import { CreateDislikedMealDto } from '../dto/create-disliked-meal.dto';
import { UpdateDislikedMealDto } from '../dto/update-disliked-meal.dto';
export declare class DislikedMealController {
    private readonly dislikedMealService;
    constructor(dislikedMealService: DislikedMealService);
    create(createDislikedMealDto: CreateDislikedMealDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDislikedMealDto: UpdateDislikedMealDto): string;
    remove(id: string): string;
}
