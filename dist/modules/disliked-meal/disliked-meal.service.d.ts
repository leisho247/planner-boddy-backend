import { CreateDislikedMealDto } from 'src/modules/disliked-meal/dto/create-disliked-meal.dto';
import PrismaService from 'src/prisma/prisma.service';
export declare class DislikedMealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDislikedMealDto: CreateDislikedMealDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
