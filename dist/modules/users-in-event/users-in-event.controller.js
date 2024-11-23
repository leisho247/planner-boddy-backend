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
exports.UsersInEventController = void 0;
const common_1 = require("@nestjs/common");
const users_in_event_service_1 = require("./users-in-event.service");
let UsersInEventController = class UsersInEventController {
    constructor(usersInEventService) {
        this.usersInEventService = usersInEventService;
    }
    async getUsersInEvent(eventId) {
        try {
            const users = await this.usersInEventService.getUsersInEvent(eventId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Users in event retrieved successfully',
                data: users,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEventsForUser(userId) {
        try {
            const events = await this.usersInEventService.getEventsForUser(userId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Events for user retrieved successfully',
                data: events,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersInEventController = UsersInEventController;
__decorate([
    (0, common_1.Get)('event/:eventId'),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersInEventController.prototype, "getUsersInEvent", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersInEventController.prototype, "getEventsForUser", null);
exports.UsersInEventController = UsersInEventController = __decorate([
    (0, common_1.Controller)('users-in-event'),
    __metadata("design:paramtypes", [users_in_event_service_1.UsersInEventService])
], UsersInEventController);
//# sourceMappingURL=users-in-event.controller.js.map