import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikePlaceService } from '../services/like-place.service';
import { CreateLikePlaceDto } from '../dto/create-like-place.dto';
//import { UpdateLikePlaceDto } from './dto/update-like-place.dto';

@Controller('like-place')
export class LikePlaceController {
  constructor(private readonly likePlaceService: LikePlaceService) {}

  @Post()
  create(@Body() createLikePlaceDto: CreateLikePlaceDto) {
    return this.likePlaceService.create(createLikePlaceDto);
  }

  @Get()
  findAll() {
    return this.likePlaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likePlaceService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikePlaceDto: UpdateLikePlaceDto) {
  //   return this.likePlaceService.update(+id, updateLikePlaceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likePlaceService.remove(+id);
  }
}
