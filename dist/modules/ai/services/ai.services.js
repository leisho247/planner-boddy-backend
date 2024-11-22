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
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AIService = class AIService {
    constructor(prisma) {
        this.prisma = prisma;
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    async getRecommendations(eventId, category) {
        let likedItems = [];
        let dislikedItems = [];
        if (category === 'movies') {
            likedItems = await this.prisma.usersLikedMovies.findMany({
                where: { eventId },
            });
            dislikedItems = await this.prisma.usersDislikedMovies.findMany({
                where: { eventId },
            });
        }
        else if (category === 'places') {
            likedItems = await this.prisma.usersLikedPlaces.findMany({
                where: { eventId },
            });
            dislikedItems = await this.prisma.usersDislikedPlaces.findMany({
                where: { eventId },
            });
        }
        else if (category === 'meals') {
            likedItems = await this.prisma.usersLikedMeals.findMany({
                where: { eventId },
            });
            dislikedItems = await this.prisma.usersDislikedMeals.findMany({
                where: { eventId },
            });
        }
        const likedNames = likedItems.map((item) => item.name).join(', ');
        const dislikedNames = dislikedItems.map((item) => item.name).join(', ');
        const prompt = `Here are some ${category} that people liked: ${likedNames}. Here are some that they disliked: ${dislikedNames}. Can you recommend similar ${category} to the liked ones but different from the disliked ones?`;
        try {
            const gptResponse = await this.openai.createCompletion({
                model: 'text-davinci-003',
                prompt,
                max_tokens: 150,
            });
            return gptResponse.data.choices[0].text.trim();
        }
        catch (error) {
            throw new common_1.HttpException('Error generating recommendations', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AIService);
//# sourceMappingURL=ai.services.js.map