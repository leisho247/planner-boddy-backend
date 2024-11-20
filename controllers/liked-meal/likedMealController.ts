import { PrismaClient } from "@prisma/client";
import HTTP_STATUS from "../../helpers/httpStatus.js";

// Instancia de PrismaClient para interactuar con la base de datos
const prisma = new PrismaClient();

// Controlador para manejar las comidas que los usuarios han marcado como "gustadas"
export const likedMealController = () => {

    /**
     * Marca una comida como "gustada" por un usuario en un evento.
     *
     * @param request Objeto de solicitud HTTP que contiene los datos del usuario, la comida y el evento.
     * @param response Objeto de respuesta HTTP que contiene la comida marcada como gustada.
     * @param next Función para pasar errores al middleware de manejo de errores.
     * @returns Respuesta HTTP con el registro de la comida marcada como gustada.
     */
    const markAsLiked = async (request: any, response: any, next: any) => {
        const { body } = request;
        const mealId = Number(body?.itemId ?? null);
        const userId = Number(body?.userId ?? null);
        const eventId = Number(body?.eventId ?? null);

        try {
            // Creación del registro en la tabla `usersLikedMeals`
            const likedMeal = await prisma.usersLikedMeals.create({
                data: {
                    mealId,
                    userId, 
                    eventId
                }
            });

            // Retorno de la respuesta con el registro creado
            return response.status(HTTP_STATUS.CREATED).json(likedMeal);
        } catch (error: any) {
            // Manejo de errores si ya existe un registro de este like
            if (error.code === 'P2002') {
                return response.status(HTTP_STATUS.OK).json({ message: "You already liked this meal." });
            }
            // Pasar el error al siguiente middleware
            next(error);
        } finally {
            // Desconectar Prisma al finalizar la operación
            await prisma.$disconnect();
        }
    };

    /**
     * Obtiene todas las comidas que un usuario ha marcado como gustadas en un evento específico.
     * 
     * @param request Objeto de solicitud HTTP que contiene los parámetros `userId` y `eventId`.
     * @param response Objeto de respuesta HTTP con las comidas gustadas.
     * @param next Función para pasar errores al middleware de manejo de errores.
     * @returns Respuesta HTTP con una lista de las comidas gustadas por el usuario en el evento.
     */
    const getLikedMeals = async (request: any, response: any, next: any) => {
        const { query } = request;
        const userId = Number(query?.id);
        const eventId = Number(request.params?.eventId);

        try {
            // Recuperar las comidas que un usuario ha marcado como gustadas en un evento
            const likedMeals = await prisma.usersLikedMeals.findMany({
                where: {
                    userId,
                    eventId
                },
                select: {
                    mealId: true,
                    userId: true,
                    eventId: true,
                },
            });

            // Retornar las comidas gustadas en la respuesta
            return response.status(HTTP_STATUS.OK).json(likedMeals);
        } catch (error: any) {
            // Pasar el error al middleware de manejo de errores
            next(error);
        } finally {
            // Desconectar Prisma al finalizar la operación
            await prisma.$disconnect();
        }
    };

    /**
     * Obtiene las comidas más gustadas en un evento específico.
     *
     * @param req Objeto de solicitud HTTP que contiene el parámetro `eventId` para filtrar las comidas.
     * @param res Objeto de respuesta HTTP con las comidas más gustadas.
     * @param next Función para pasar errores al middleware de manejo de errores.
     * @returns Respuesta HTTP con las comidas más gustadas en el evento, junto con sus detalles.
     */
    const getMostLikedMeals = async (req: any, res: any, next: any) => {
        const { params } = req;
        const eventId = Number(params?.eventId);

        try {
            // Obtener las comidas más gustadas en el evento, agrupando por `mealId` y ordenando por la cantidad de likes
            const likedMeals = await prisma.usersLikedMeals.groupBy({
                by: ['mealId'],
                where: {
                    eventId,
                },
                _count: {
                    userId: true,
                },
                orderBy: {
                    _count: {
                        userId: 'desc', // Ordenamos por la cantidad de likes (de mayor a menor)
                    },
                },
                take: 3, // Limitar a los 3 resultados más gustados
            });

            // Obtener los detalles de las comidas más gustadas
            const mealIds = likedMeals.map(meal => meal.mealId);

            const mealDetails = await prisma.meal.findMany({
                where: {
                    id: { in: mealIds },
                },
                select: {
                    id: true,
                    name: true,
                    urlImage: true,
                },
            });

            // Combinar los resultados de likes con los detalles de las comidas
            const formattedResults = likedMeals.map(meal => {
                const mealDetail = mealDetails.find(detail => detail.id === meal.mealId);
                return {
                    mealId: meal.mealId,
                    title: mealDetail?.name || 'Unknown title', // En caso de que no se encuentre el título
                    urlImage: mealDetail?.urlImage || 'Unknown image',
                    likes: meal._count.userId,
                };
            });

            // Enviar los resultados combinados
            res.json(formattedResults);
        } catch (error: any) {
            // Pasar el error al middleware de manejo de errores
            next(error);
        } finally {
            // Desconectar Prisma al finalizar la operación
            await prisma.$disconnect();
        }
    };
  
    return {
        markAsLiked,
        getLikedMeals,
        getMostLikedMeals,
    };
};
