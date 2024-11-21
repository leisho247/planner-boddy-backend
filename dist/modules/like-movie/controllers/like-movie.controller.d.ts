import { LikeMovieService } from './like-movie.service';
import { CreateLikeMovieDto } from '../dto/create-like-movie.dto';
import { UpdateLikeMovieDto } from '../dto/update-like-movie.dto';
export declare class LikeMovieController {
    private readonly likeMovieService;
    constructor(likeMovieService: LikeMovieService);
    create(createLikeMovieDto: CreateLikeMovieDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateLikeMovieDto: UpdateLikeMovieDto): any;
    remove(id: string): any;
}
