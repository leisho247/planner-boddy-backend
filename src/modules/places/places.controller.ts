import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async getPlaces() {
    try {
      const places = await this.placesService.getPlaces();
      return {
        statusCode: HttpStatus.OK,
        message: 'Places retrieved successfully',
        data: places,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error retrieving places',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
