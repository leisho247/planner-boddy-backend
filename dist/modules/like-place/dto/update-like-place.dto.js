"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLikePlaceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_like_place_dto_1 = require("./create-like-place.dto");
class UpdateLikePlaceDto extends (0, mapped_types_1.PartialType)(create_like_place_dto_1.CreateLikePlaceDto) {
}
exports.UpdateLikePlaceDto = UpdateLikePlaceDto;
//# sourceMappingURL=update-like-place.dto.js.map