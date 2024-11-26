import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { DislikedPlaceService } from './disliked-place.service';
import { CreateDislikedPlaceDto } from './dto/create-disliked-place.dto';

@Controller('disliked-places')
export class DislikedPlaceController {
  constructor(private readonly dislikedPlaceService: DislikedPlaceService) {}

  @Post('add')
  async addDislikedPlace(
    @Body() createDislikedPlaceDto: CreateDislikedPlaceDto,
  ) {
    const dislikedPlace = await this.dislikedPlaceService.addDislikedPlace(
      createDislikedPlaceDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Disliked place added successfully.',
      data: dislikedPlace,
    };
  }

  @Get(':id')
  async getDislikedPlace(@Param('id') id: string) {
    const dislikedPlace = await this.dislikedPlaceService.getDislikedPlace(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Disliked place retrieved successfully.',
      data: dislikedPlace,
    };
  }
}
