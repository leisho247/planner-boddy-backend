import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import HTTP_STATUS from "../../helpers/httpStatus";

const prisma = new PrismaClient();

export const dislikedPlaceController = () => {
  /**
   * Marca un lugar como no deseado por un usuario en un evento.
   * @param request Objeto de solicitud HTTP.
   * @param response Objeto de respuesta HTTP.
   * @param next Función para manejar errores.
   */
  const markAsDisliked = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { body } = request;
    const placeId = Number(body?.itemId ?? null);
    const userId = Number(body?.userId ?? null);
    const eventId = Number(body?.eventId ?? null);

    // Verifica que los campos requeridos estén presentes
    if (!placeId || !userId || !eventId) {
      return response.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Faltan o son inválidos los campos requeridos: placeId, userId, eventId.",
      });
    }

    try {
      const dislikedPlace = await prisma.usersDislikedPlaces.create({
        data: {
          placeId,
          userId,
          eventId,
        },
      });

      return response.status(HTTP_STATUS.CREATED).json(dislikedPlace);
    } catch (error: any) {
      // Maneja errores específicos de Prisma, como conflictos únicos (P2002)
      if (error.code === "P2002") {
        return response.status(HTTP_STATUS.CONFLICT).json({
          message: "Ya marcaste este lugar como no deseado.",
        });
      }

      // Manejo general de errores
      next(error);
    } finally {
      await prisma.$disconnect().catch((disconnectError) => {
        console.error("Error al desconectar Prisma:", disconnectError);
      });
    }
  };

  /**
   * Obtiene la lista de lugares no deseados para un evento específico.
   * @param request Objeto de solicitud HTTP.
   * @param response Objeto de respuesta HTTP.
   * @param next Función para manejar errores.
   */
  const getDislikedPlaces = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { params } = request;
    const eventId = Number(params?.eventId);

    // Verifica que el campo eventId esté presente
    if (!eventId) {
      return response.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Falta o es inválido el campo requerido: eventId.",
      });
    }

    try {
      const dislikedPlaces = await prisma.usersDislikedPlaces.findMany({
        where: {
          eventId,
        },
        select: {
          placeId: true,
          userId: true,
          eventId: true,
        },
      });

      return response.status(HTTP_STATUS.OK).json(dislikedPlaces);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect().catch((disconnectError) => {
        console.error("Error al desconectar Prisma:", disconnectError);
      });
    }
  };

  return {
    markAsDisliked,
    getDislikedPlaces,
  };
};
