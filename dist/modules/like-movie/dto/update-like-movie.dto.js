"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLikeMovieDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_like_movie_dto_1 = require("./create-like-movie.dto");
class UpdateLikeMovieDto extends (0, mapped_types_1.PartialType)(create_like_movie_dto_1.CreateLikeMovieDto) {
}
exports.UpdateLikeMovieDto = UpdateLikeMovieDto;
//# sourceMappingURL=update-like-movie.dto.js.map