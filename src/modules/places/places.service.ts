import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PlacesService {
  async getPlaces() {
    try {
      const places = await prisma.place.findMany({
        select: {
          id: true,
          title: true,
          urlImage: true, // Incluye la imagen si está disponible
        },
      });
      return places;
    } catch (error) {
      throw error; // Propaga el error para que lo maneje el controlador
    } finally {
      await prisma.$disconnect();
    }
  }
}