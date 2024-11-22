import { PrismaService } from 'src/prisma/prisma.service';
export declare class AIService {
    private prisma;
    private openai;
    constructor(prisma: PrismaService);
    getRecommendations(eventId: string, category: string): Promise<string>;
}
