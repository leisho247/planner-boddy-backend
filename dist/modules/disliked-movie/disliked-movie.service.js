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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikedMovieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DislikedMovieService = class DislikedMovieService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markAsDisliked(movieId, userId, eventId) {
        try {
            const dislikedMovie = await this.prisma.usersDislikedMovies.create({
                data: {
                    movieId,
                    userId,
                    eventId,
                },
            });
            return dislikedMovie;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException('You already disliked this movie.', common_1.HttpStatus.OK);
            }
            throw new common_1.HttpException('Error creating disliked movie', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDislikedMovies(userId, eventId) {
        try {
            const dislikedMovies = await this.prisma.usersDislikedMovies.findMany({
                where: { eventId },
                select: {
                    movieId: true,
                    userId: true,
                    eventId: true,
                },
            });
            return dislikedMovies;
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching disliked movies', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DislikedMovieService = DislikedMovieService;
exports.DislikedMovieService = DislikedMovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default])
], DislikedMovieService);
//# sourceMappingURL=disliked-movie.service.js.map