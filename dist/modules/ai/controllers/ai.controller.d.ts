import { AIService } from '../services/ai.services';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    getRecommendations(eventId: string, category: string): Promise<{
        recommendations: string;
    }>;
}
