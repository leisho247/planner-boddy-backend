import PrismaService from 'src/prisma/prisma.service';
import { CreateLikePlaceDto } from './dto/create-like-place.dto';
export declare class LikePlaceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLikePlaceDto: CreateLikePlaceDto): Promise<{
        id: number;
        userId: number;
        placeId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
