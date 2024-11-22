import { CreateLikeMovieDto } from './create-like-movie.dto';
declare const UpdateLikeMovieDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLikeMovieDto>>;
export declare class UpdateLikeMovieDto extends UpdateLikeMovieDto_base {
    title?: string;
    description?: string;
}
export {};
