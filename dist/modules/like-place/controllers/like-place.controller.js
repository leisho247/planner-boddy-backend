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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePlaceController = void 0;
const common_1 = require("@nestjs/common");
const like_place_service_1 = require("./services/like-place.service");
const create_like_place_dto_1 = require("./dto/create-like-place.dto");
const update_like_place_dto_1 = require("./dto/update-like-place.dto");
let LikePlaceController = class LikePlaceController {
    constructor(likePlaceService) {
        this.likePlaceService = likePlaceService;
    }
    create(createLikePlaceDto) {
        return this.likePlaceService.create(createLikePlaceDto);
    }
    findAll() {
        return this.likePlaceService.findAll();
    }
    findOne(id) {
        return this.likePlaceService.findOne(+id);
    }
    update(id, updateLikePlaceDto) {
        return this.likePlaceService.update(+id, updateLikePlaceDto);
    }
    remove(id) {
        return this.likePlaceService.remove(+id);
    }
};
exports.LikePlaceController = LikePlaceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_like_place_dto_1.CreateLikePlaceDto !== "undefined" && create_like_place_dto_1.CreateLikePlaceDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], LikePlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LikePlaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikePlaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_like_place_dto_1.UpdateLikePlaceDto !== "undefined" && update_like_place_dto_1.UpdateLikePlaceDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], LikePlaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikePlaceController.prototype, "remove", null);
exports.LikePlaceController = LikePlaceController = __decorate([
    (0, common_1.Controller)('like-place'),
    __metadata("design:paramtypes", [typeof (_a = typeof like_place_service_1.LikePlaceService !== "undefined" && like_place_service_1.LikePlaceService) === "function" ? _a : Object])
], LikePlaceController);
//# sourceMappingURL=like-place.controller.js.map