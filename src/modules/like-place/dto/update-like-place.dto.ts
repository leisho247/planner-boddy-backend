import { PartialType } from '@nestjs/mapped-types';
import { CreateLikePlaceDto } from './create-like-place.dto';

export class UpdateLikePlaceDto extends PartialType(CreateLikePlaceDto) {}
