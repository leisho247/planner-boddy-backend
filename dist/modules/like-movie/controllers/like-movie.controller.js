"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeMovieController = void 0;
const common_1 = require("@nestjs/common");
const like_movie_service_1 = require("../services/like-movie.service");
const create_like_movie_dto_1 = require("../dto/create-like-movie.dto");
let LikeMovieController = class LikeMovieController {
    constructor(likeMovieService) {
        this.likeMovieService = likeMovieService;
    }
    create(createLikeMovieDto) {
        return this.likeMovieService.create(createLikeMovieDto);
    }
    findAll() {
        return this.likeMovieService.findAll();
    }
    findOne(id) {
        return this.likeMovieService.findOne(+id);
    }
    remove(id) {
        return this.likeMovieService.remove(+id);
    }
};
exports.LikeMovieController = LikeMovieController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_movie_dto_1.CreateLikeMovieDto]),
    __metadata("design:returntype", void 0)
], LikeMovieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LikeMovieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikeMovieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikeMovieController.prototype, "remove", null);
exports.LikeMovieController = LikeMovieController = __decorate([
    (0, common_1.Controller)('like-movie'),
    __metadata("design:paramtypes", [like_movie_service_1.LikeMovieService])
], LikeMovieController);
//# sourceMappingURL=like-movie.controller.js.map