"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikedMovieModule = void 0;
const common_1 = require("@nestjs/common");
const disliked_movie_controller_1 = require("./disliked-movie.controller");
const disliked_movie_service_1 = require("./disliked-movie.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let DislikedMovieModule = class DislikedMovieModule {
};
exports.DislikedMovieModule = DislikedMovieModule;
exports.DislikedMovieModule = DislikedMovieModule = __decorate([
    (0, common_1.Module)({
        controllers: [disliked_movie_controller_1.DislikedMovieController],
        providers: [disliked_movie_service_1.DislikedMovieService, prisma_service_1.default],
    })
], DislikedMovieModule);
//# sourceMappingURL=disliked-movie.module.js.map