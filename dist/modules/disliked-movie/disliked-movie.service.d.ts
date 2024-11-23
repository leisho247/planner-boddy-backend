import PrismaService from 'src/prisma/prisma.service';
export declare class DislikedMovieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsDisliked(movieId: number, userId: number, eventId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
        movieId: number;
    }>;
    getDislikedMovies(userId: number, eventId: number): Promise<{
        userId: number;
        eventId: number;
        movieId: number;
    }[]>;
}
