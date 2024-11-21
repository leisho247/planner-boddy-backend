"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePlaceModule = void 0;
const common_1 = require("@nestjs/common");
const like_place_service_1 = require("./services/like-place.service");
const like_place_controller_1 = require("./controllers/like-place.controller");
let LikePlaceModule = class LikePlaceModule {
};
exports.LikePlaceModule = LikePlaceModule;
exports.LikePlaceModule = LikePlaceModule = __decorate([
    (0, common_1.Module)({
        controllers: [like_place_controller_1.LikePlaceController],
        providers: [like_place_service_1.LikePlaceService],
    })
], LikePlaceModule);
//# sourceMappingURL=like-place.module.js.map