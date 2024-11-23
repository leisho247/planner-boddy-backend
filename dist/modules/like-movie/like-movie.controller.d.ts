import { LikeMovieService } from './like-movie.service';
import { CreateLikeMovieDto } from './dto/create-like-movie.dto';
export declare class LikeMovieController {
    private readonly likeMovieService;
    constructor(likeMovieService: LikeMovieService);
    create(createLikeMovieDto: CreateLikeMovieDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
