import { PartialType } from '@nestjs/mapped-types';
import { CreateDislikedMealDto } from './create-disliked-meal.dto';

export class UpdateDislikedMealDto extends PartialType(CreateDislikedMealDto) {}
