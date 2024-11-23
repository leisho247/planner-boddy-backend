import { HttpStatus } from '@nestjs/common';
import { PlacesService } from './places.service';
export declare class PlacesController {
    private readonly placesService;
    constructor(placesService: PlacesService);
    getPlaces(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
}
