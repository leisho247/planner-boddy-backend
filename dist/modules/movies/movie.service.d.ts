import PrismaService from 'src/prisma/prisma.service';
export declare class MovieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMovies(): Promise<{
        id: number;
        urlImage: string;
        title: string;
    }[]>;
}
