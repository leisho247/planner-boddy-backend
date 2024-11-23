import { DislikedMovieService } from './disliked-movie.service';
export declare class DislikedMovieController {
    private readonly dislikedMovieService;
    constructor(dislikedMovieService: DislikedMovieService);
    markAsDisliked(body: {
        itemId: number;
        userId: number;
        eventId: number;
    }): Promise<any>;
    getDislikedMovies(userId: string, eventId: string): Promise<any>;
}
