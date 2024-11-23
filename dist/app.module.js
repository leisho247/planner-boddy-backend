"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./config/database.config");
const disliked_meal_module_1 = require("./modules/disliked-meal/disliked-meal.module");
const like_place_module_1 = require("./modules/like-place/like-place.module");
const like_movie_module_1 = require("./modules/like-movie/like-movie.module");
const liked_meal_module_1 = require("./modules/liked-meal/liked-meal.module");
const movie_module_1 = require("./modules/movies/movie.module");
const places_module_1 = require("./modules/places/places.module");
const users_in_event_module_1 = require("./modules/users-in-event/users-in-event.module");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default],
            }),
            ,
            disliked_meal_module_1.DislikedMealModule,
            like_place_module_1.LikePlaceModule,
            like_movie_module_1.LikeMovieModule,
            liked_meal_module_1.LikedMealModule,
            movie_module_1.MovieModule,
            places_module_1.PlacesModule,
            users_in_event_module_1.UsersInEventModule
        ],
        providers: [prisma_service_1.default]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map