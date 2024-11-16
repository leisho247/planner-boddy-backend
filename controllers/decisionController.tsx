import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus";

const prisma = new PrismaClient();

export const decisionController = () => {
  // Obtener la película más votada para un evento
  const getTopLikedMovie = async (eventId: number): Promise<number | null> => {
    try {
      const likedMovies = await prisma.usersLikedMovies.groupBy({
        by: ["movieId"],
        where: { eventId },
        _count: { userId: true },
        orderBy: { _count: { userId: "desc" } },
        take: 3,
      });

      const movieIds = likedMovies.map((movie) => movie.movieId);
      const movieDetails = await prisma.movie.findMany({
        where: { id: { in: movieIds } },
        select: { id: true, title: true, urlImage: true },
      });

      const topMovies = likedMovies.map((movie) => {
        const movieDetail = movieDetails.find((detail) => detail.id === movie.movieId);
        return {
          movieId: movie.movieId,
          title: movieDetail?.title || "Título desconocido",
          urlImage: movieDetail?.urlImage || "Imagen desconocida",
          likes: movie._count.userId,
        };
      });

      if (topMovies.length > 0) {
        const maxLikes = topMovies[0].likes;
        const potentialMovies = topMovies.filter((movie) => movie.likes === maxLikes);

        // Si hay empate, selecciona una película al azar
        return potentialMovies.length === 1
          ? potentialMovies[0].movieId
          : potentialMovies[Math.floor(Math.random() * potentialMovies.length)].movieId;
      }

      return null;
    } catch (error) {
      console.error("Error en getTopLikedMovie:", error);
      return null;
    }
  };

  // Obtener el lugar más votado para un evento
  const getTopLikedPlace = async (eventId: number): Promise<number | null> => {
    try {
      const likedPlaces = await prisma.usersLikedPlaces.groupBy({
        by: ["placeId"],
        where: { eventId },
        _count: { userId: true },
        orderBy: { _count: { userId: "desc" } },
        take: 3,
      });

      const placeIds = likedPlaces.map((place) => place.placeId);
      const placeDetails = await prisma.place.findMany({
        where: { id: { in: placeIds } },
        select: { id: true, title: true, urlImage: true },
      });

      const topPlaces = likedPlaces.map((place) => {
        const placeDetail = placeDetails.find((detail) => detail.id === place.placeId);
        return {
          placeId: place.placeId,
          title: placeDetail?.title || "Título desconocido",
          urlImage: placeDetail?.urlImage || "Imagen desconocida",
          likes: place._count.userId,
        };
      });

      if (topPlaces.length > 0) {
        const maxLikes = topPlaces[0].likes;
        const potentialPlaces = topPlaces.filter((place) => place.likes === maxLikes);

        // Si hay empate, selecciona un lugar al azar
        return potentialPlaces.length === 1
          ? potentialPlaces[0].placeId
          : potentialPlaces[Math.floor(Math.random() * potentialPlaces.length)].placeId;
      }

      return null;
    } catch (error) {
      console.error("Error en getTopLikedPlace:", error);
      return null;
    }
  };

  // Obtener la comida más votada para un evento
  const getTopLikedMeal = async (eventId: number): Promise<number | null> => {
    try {
      const likedMeals = await prisma.usersLikedMeals.groupBy({
        by: ["mealId"],
        where: { eventId },
        _count: { userId: true },
        orderBy: { _count: { userId: "desc" } },
        take: 3,
      });

      const mealIds = likedMeals.map((meal) => meal.mealId);
      const mealDetails = await prisma.meal.findMany({
        where: { id: { in: mealIds } },
        select: { id: true, name: true, urlImage: true },
      });

      const topMeals = likedMeals.map((meal) => {
        const mealDetail = mealDetails.find((detail) => detail.id === meal.mealId);
        return {
          mealId: meal.mealId,
          title: mealDetail?.name || "Título desconocido",
          urlImage: mealDetail?.urlImage || "Imagen desconocida",
          likes: meal._count.userId,
        };
      });

      if (topMeals.length > 0) {
        const maxLikes = topMeals[0].likes;
        const potentialMeals = topMeals.filter((meal) => meal.likes === maxLikes);

        // Si hay empate, selecciona una comida al azar
        return potentialMeals.length === 1
          ? potentialMeals[0].mealId
          : potentialMeals[Math.floor(Math.random() * potentialMeals.length)].mealId;
      }

      return null;
    } catch (error) {
      console.error("Error en getTopLikedMeal:", error);
      return null;
    }
  };

  // Crear una decisión para un evento
  const createDecision = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const eventId = Number(req.params?.eventId);

    try {
      const movieId = await getTopLikedMovie(eventId);
      const placeId = await getTopLikedPlace(eventId);
      const mealId = await getTopLikedMeal(eventId);

      if (!movieId && !placeId && !mealId) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "No se encontraron elementos votados para este evento",
        });
      }

      const newDecision = await prisma.eventDecisions.create({
        data: { eventId, movieId, placeId, mealId },
        include: { events: true, movies: true, places: true, meals: true },
      });

      return res.status(httpStatus.CREATED).json({
        data: newDecision,
        message: "Decisión creada con éxito",
      });
    } catch (error) {
      next(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Ocurrió un error al crear la decisión",
      });
    } finally {
      await prisma.$disconnect();
    }
  };

  // Obtener la decisión de un evento
  const getDecision = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const eventId = Number(req.params?.eventId);

    try {
      const decision = await prisma.eventDecisions.findFirst({
        where: { eventId },
        select: {
          movieId: true,
          placeId: true,
          mealId: true,
          movies: { select: { title: true, urlImage: true } },
          places: { select: { title: true, urlImage: true } },
          meals: { select: { name: true, urlImage: true } },
        },
      });

      if (!decision) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "No se encontró una decisión para este evento",
        });
      }

      return res.status(httpStatus.OK).json({
        data: {
          movie: { id: decision.movieId, title: decision.movies?.title, urlImage: decision.movies?.urlImage },
          place: { id: decision.placeId, title: decision.places?.title, urlImage: decision.places?.urlImage },
          meal: { id: decision.mealId, title: decision.meals?.name, urlImage: decision.meals?.urlImage },
        },
        message: "Decisión obtenida con éxito",
      });
    } catch (error) {
      next(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Ocurrió un error al obtener la decisión",
      });
    } finally {
      await prisma.$disconnect();
    }
  };

  // Retornar las funciones de decisión
  return { createDecision, getDecision };
};

export default decisionController;
