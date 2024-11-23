import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(): Promise<{
        id: number;
        urlImage: string;
        title: string;
    }[]>;
}
