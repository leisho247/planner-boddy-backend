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
exports.LikedMealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LikedMealService = class LikedMealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markAsLiked(mealId, userId, eventId) {
        try {
            const likedMeal = await this.prisma.usersLikedMeals.create({
                data: {
                    mealId,
                    userId,
                    eventId,
                },
            });
            return likedMeal;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException('You already liked this meal.', common_1.HttpStatus.OK);
            }
            throw new common_1.HttpException('Error creating liked meal', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLikedMeals(userId, eventId) {
        try {
            const likedMeals = await this.prisma.usersLikedMeals.findMany({
                where: { userId, eventId },
                select: {
                    mealId: true,
                    userId: true,
                    eventId: true,
                },
            });
            return likedMeals;
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching liked meals', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMostLikedMeals(eventId) {
        try {
            const likedMeals = await this.prisma.usersLikedMeals.groupBy({
                by: ['mealId'],
                where: { eventId },
                _count: { userId: true },
                orderBy: {
                    _count: { userId: 'desc' },
                },
                take: 3,
            });
            const mealIds = likedMeals.map((meal) => meal.mealId);
            const mealDetails = await this.prisma.meal.findMany({
                where: { id: { in: mealIds } },
                select: {
                    id: true,
                    name: true,
                    urlImage: true,
                },
            });
            const formattedResults = likedMeals.map((meal) => {
                const mealDetail = mealDetails.find((detail) => detail.id === meal.mealId);
                return {
                    mealId: meal.mealId,
                    title: mealDetail?.name || 'Unknown title',
                    urlImage: mealDetail?.urlImage || 'Unknown image',
                    likes: meal._count.userId,
                };
            });
            return formattedResults;
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching most liked meals', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LikedMealService = LikedMealService;
exports.LikedMealService = LikedMealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default])
], LikedMealService);
//# sourceMappingURL=liked-meal.service.js.map