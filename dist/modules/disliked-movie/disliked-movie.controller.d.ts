import { DislikedMovieService } from './disliked-movie.service';
export declare class DislikedMovieController {
    private readonly dislikedMovieService;
    constructor(dislikedMovieService: DislikedMovieService);
    markAsDisliked(body: {
        itemId: number;
        userId: number;
        eventId: number;
    }): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        eventId: number;
        movieId: number;
    }>;
    getDislikedMovies(userId: string, eventId: string): Promise<{
        userId: number;
        eventId: number;
        movieId: number;
    }[]>;
}
