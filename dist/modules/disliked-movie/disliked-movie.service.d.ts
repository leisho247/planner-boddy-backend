import PrismaService from 'src/prisma/prisma.service';
export declare class DislikedMovieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsDisliked(movieId: number, userId: number, eventId: number): Promise<any>;
    getDislikedMovies(userId: number, eventId: number): Promise<any>;
}
