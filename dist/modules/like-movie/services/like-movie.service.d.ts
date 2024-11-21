import { CreateLikeMovieDto } from './dto/create-like-movie.dto';
import { UpdateLikeMovieDto } from './dto/update-like-movie.dto';
export declare class LikeMovieService {
    create(createLikeMovieDto: CreateLikeMovieDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLikeMovieDto: UpdateLikeMovieDto): string;
    remove(id: number): string;
}
