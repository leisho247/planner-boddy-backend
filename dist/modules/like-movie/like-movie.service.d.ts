import PrismaService from 'src/prisma/prisma.service';
import { CreateLikeMovieDto } from './dto/create-like-movie.dto';
export declare class LikeMovieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLikeMovieDto: CreateLikeMovieDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
