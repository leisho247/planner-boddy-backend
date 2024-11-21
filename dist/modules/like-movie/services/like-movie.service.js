"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeMovieService = void 0;
const common_1 = require("@nestjs/common");
let LikeMovieService = class LikeMovieService {
    create(createLikeMovieDto) {
        return 'This action adds a new likeMovie';
    }
    findAll() {
        return `This action returns all likeMovie`;
    }
    findOne(id) {
        return `This action returns a #${id} likeMovie`;
    }
    update(id, updateLikeMovieDto) {
        return `This action updates a #${id} likeMovie`;
    }
    remove(id) {
        return `This action removes a #${id} likeMovie`;
    }
};
exports.LikeMovieService = LikeMovieService;
exports.LikeMovieService = LikeMovieService = __decorate([
    (0, common_1.Injectable)()
], LikeMovieService);
//# sourceMappingURL=like-movie.service.js.map