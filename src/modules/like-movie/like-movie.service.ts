import { Injectable } from '@nestjs/common';

import PrismaService from 'src/prisma/prisma.service';
import { CreateLikeMovieDto } from './dto/create-like-movie.dto';
//import { UpdateLikeMovieDto } from '../dto/update-like-movie.dto';

@Injectable()
export class LikeMovieService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLikeMovieDto: CreateLikeMovieDto) {
    return this.prisma.usersLikedMovies.create({
      data: createLikeMovieDto as any,
    });
  }

  findAll() {
    return `This action returns all likeMovie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likeMovie`;
  }

  // update(id: number, updateLikeMovieDto: UpdateLikeMovieDto) {
  //   return `This action updates a #${id} likeMovie`;
  // }

  remove(id: number) {
    return `This action removes a #${id} likeMovie`;
  }
}