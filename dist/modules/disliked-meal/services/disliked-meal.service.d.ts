import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDislikedMealDto } from '../dto/create-disliked-meal.dto';
export declare class DislikedMealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDislikedMealDto: CreateDislikedMealDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
