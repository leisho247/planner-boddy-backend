import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { DislikedMealService } from './disliked-meal.service';
import { CreateDislikedMealDto } from './dto/create-disliked-meal.dto';
//import { UpdateDislikedMealDto } from '../dto/update-disliked-meal.dto';

@Controller('disliked-meal')
export class DislikedMealController {
  constructor(private readonly dislikedMealService: DislikedMealService) {}

  @Post()
  create(@Body() createDislikedMealDto: CreateDislikedMealDto) {
    return this.dislikedMealService.create(createDislikedMealDto);
  }

  @Get()
  findAll() {
    return this.dislikedMealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dislikedMealService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDislikedMealDto: UpdateDislikedMealDto,
  // ) {
  //   return this.dislikedMealService.update(+id, updateDislikedMealDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dislikedMealService.remove(+id);
  }
}
