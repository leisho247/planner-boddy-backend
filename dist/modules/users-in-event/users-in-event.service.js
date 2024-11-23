"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersInEventService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let UsersInEventService = class UsersInEventService {
    async getUsersInEvent(eventId) {
        try {
            const usersInEvent = await prisma.userInEvent.findMany({
                where: { eventId },
                include: { user: true },
            });
            if (!usersInEvent || usersInEvent.length === 0) {
                throw new common_1.NotFoundException('Event not found or no users in event');
            }
            return usersInEvent.map((ue) => ue.user);
        }
        catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    }
    async getEventsForUser(userId) {
        try {
            const eventsForUser = await prisma.userInEvent.findMany({
                where: { userId },
                include: { event: true },
            });
            if (!eventsForUser || eventsForUser.length === 0) {
                throw new common_1.NotFoundException('User not found or no events for user');
            }
            return eventsForUser.map((ue) => ue.event);
        }
        catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    }
};
exports.UsersInEventService = UsersInEventService;
exports.UsersInEventService = UsersInEventService = __decorate([
    (0, common_1.Injectable)()
], UsersInEventService);
//# sourceMappingURL=users-in-event.service.js.map