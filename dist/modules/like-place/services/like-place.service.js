"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePlaceService = void 0;
const common_1 = require("@nestjs/common");
let LikePlaceService = class LikePlaceService {
    create(createLikePlaceDto) {
        return 'This action adds a new likePlace';
    }
    findAll() {
        return `This action returns all likePlace`;
    }
    findOne(id) {
        return `This action returns a #${id} likePlace`;
    }
    update(id, updateLikePlaceDto) {
        return `This action updates a #${id} likePlace`;
    }
    remove(id) {
        return `This action removes a #${id} likePlace`;
    }
};
exports.LikePlaceService = LikePlaceService;
exports.LikePlaceService = LikePlaceService = __decorate([
    (0, common_1.Injectable)()
], LikePlaceService);
//# sourceMappingURL=like-place.service.js.map