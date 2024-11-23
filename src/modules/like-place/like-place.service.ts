import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateLikePlaceDto } from './dto/create-like-place.dto';


//import { UpdateLikePlaceDto } from '../dto/update-like-place.dto';

@Injectable()
export class LikePlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLikePlaceDto: CreateLikePlaceDto) {
    return this.prisma.usersLikedPlaces.create({
      data: createLikePlaceDto as any,
    });
  }

  findAll() {
    return `This action returns all likePlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likePlace`;
  }

  // update(id: number, updateLikePlaceDto: UpdateLikePlaceDto) {
  //   return `This action updates a #${id} likePlace`;
  // }

  remove(id: number) {
    return `This action removes a #${id} likePlace`;
  }
}
