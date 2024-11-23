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
exports.LikedMealController = void 0;
const common_1 = require("@nestjs/common");
const liked_meal_service_1 = require("./liked-meal.service");
let LikedMealController = class LikedMealController {
    constructor(likedMealService) {
        this.likedMealService = likedMealService;
    }
    async markAsLiked(body) {
        const { itemId, userId, eventId } = body;
        if (!itemId || !userId || !eventId) {
            throw new common_1.HttpException('Missing required fields', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.likedMealService.markAsLiked(itemId, userId, eventId);
    }
    async getLikedMeals(userId, eventId) {
        if (!userId || !eventId) {
            throw new common_1.HttpException('Missing required parameters', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.likedMealService.getLikedMeals(Number(userId), Number(eventId));
    }
    async getMostLikedMeals(eventId) {
        return this.likedMealService.getMostLikedMeals(Number(eventId));
    }
};
exports.LikedMealController = LikedMealController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikedMealController.prototype, "markAsLiked", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LikedMealController.prototype, "getLikedMeals", null);
__decorate([
    (0, common_1.Get)(':eventId/most-liked'),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikedMealController.prototype, "getMostLikedMeals", null);
exports.LikedMealController = LikedMealController = __decorate([
    (0, common_1.Controller)('liked-meals'),
    __metadata("design:paramtypes", [liked_meal_service_1.LikedMealService])
], LikedMealController);
//# sourceMappingURL=liked-meal.controller.js.map