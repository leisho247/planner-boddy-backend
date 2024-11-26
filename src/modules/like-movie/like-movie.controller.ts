import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeMovieService } from './like-movie.service';
import { CreateLikeMovieDto } from './dto/create-like-movie.dto';
//import { UpdateLikeMovieDto } from '../dto/update-like-movie.dto';

@Controller('like-movie')
export class LikeMovieController {
  constructor(private readonly likeMovieService: LikeMovieService) {}

  @Post()
  create(@Body() createLikeMovieDto: CreateLikeMovieDto) {
    return this.likeMovieService.create(createLikeMovieDto);
  }

  @Get()
  findAll() {
    return this.likeMovieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeMovieService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeMovieDto: UpdateLikeMovieDto) {
  //   return this.likeMovieService.update(+id, updateLikeMovieDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeMovieService.remove(+id);
  }
}
