import httpStatus from "../../helpers/httpStatus.js";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const eventController = () => {
    /**
     * Crea un evento nuevo.
     */
    const createEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { name, password, plannedDate, userId } = req.body;

        try {
            const newEvent = await prisma.event.create({
                data: {
                    name,
                    password,
                    plannedDate: new Date(plannedDate),
                    userId: parseInt(userId),
                },
                include: {
                    users: true,
                },
            });

            return res.status(httpStatus.CREATED).json({
                data: newEvent,
                message: "Evento creado con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Permite a un usuario unirse a un evento.
     */
    const joinEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { id, password, userId } = req.body;

        try {
            const event = await prisma.event.findUnique({
                where: { id: parseInt(id) },
                include: { users: true },
            });

            if (!event) {
                return res.status(httpStatus.NOT_FOUND).json({
                    message: "Evento no encontrado. Revisa el ID del evento.",
                });
            }

            if (event.password !== password) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    message: "Contraseña incorrecta.",
                });
            }

            await prisma.userInEvent.create({
                data: {
                    userId: parseInt(userId),
                    eventId: event.id,
                },
            });

            return res.status(httpStatus.OK).json({
                data: event,
                message: "Te uniste al evento con éxito",
            });
        } catch (error: any) {
            if (error.code === "P2002") {
                return res.status(httpStatus.CONFLICT).json({
                    message: "Ya formas parte de este evento.",
                });
            }
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Obtiene un evento por su ID.
     */
    const getEventById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const event = await prisma.event.findUnique({
                where: { id: parseInt(id) },
                include: {
                    users: { include: { user: true } },
                },
            });

            if (!event) {
                return res.status(httpStatus.NOT_FOUND).json({
                    message: "Evento no encontrado",
                });
            }

            return res.status(httpStatus.OK).json({
                data: event,
                message: "Evento obtenido con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Actualiza los datos de un evento.
     */
    const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { name, plannedDate } = req.body;

        try {
            const updatedEvent = await prisma.event.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    plannedDate: new Date(plannedDate),
                },
                include: { users: true },
            });

            return res.status(httpStatus.OK).json({
                data: updatedEvent,
                message: "Evento actualizado con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Elimina un evento y sus registros relacionados.
     */
    const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            await prisma.$transaction(async (prisma) => {
                const event = await prisma.event.findUnique({
                    where: { id: parseInt(id) },
                });

                if (!event) {
                    return res.status(httpStatus.NOT_FOUND).json({
                        message: "Evento no encontrado",
                    });
                }

                await prisma.userInEvent.deleteMany({
                    where: { eventId: parseInt(id) },
                });

                // Borra las relaciones asociadas con el evento
                await prisma.usersDislikedMeals.deleteMany({
                    where: { eventId: parseInt(id) },
                });
                await prisma.usersLikedMeals.deleteMany({
                    where: { eventId: parseInt(id) },
                });
                // Agregar otras tablas relacionadas aquí

                await prisma.event.delete({ where: { id: parseInt(id) } });
            });

            return res.status(httpStatus.OK).json({
                message: "Evento y registros relacionados eliminados con éxito",
            });
        } catch (error: any) {
            if (error.code === "P2025") {
                return res.status(httpStatus.NOT_FOUND).json({
                    message: "Evento no encontrado",
                });
            }
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Lista todos los eventos.
     */
    const listEvents = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const events = await prisma.event.findMany({
                include: {
                    users: { include: { user: true } },
                },
            });

            return res.status(httpStatus.OK).json({
                data: events,
                message: "Eventos obtenidos con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Añade un usuario a un evento.
     */
    const addUserToEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { eventId, userId } = req.body;

        try {
            const userInEvent = await prisma.userInEvent.create({
                data: {
                    eventId: parseInt(eventId),
                    userId: parseInt(userId),
                },
                include: {
                    event: true,
                    user: true,
                },
            });

            return res.status(httpStatus.CREATED).json({
                data: userInEvent,
                message: "Usuario añadido al evento con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Elimina un usuario de un evento.
     */
    const removeUserFromEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { eventId, userId } = req.params;

        try {
            await prisma.userInEvent.delete({
                where: {
                    userId_eventId: {
                        userId: parseInt(userId),
                        eventId: parseInt(eventId),
                    },
                },
            });

            return res.status(httpStatus.OK).json({
                message: "Usuario eliminado del evento con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Obtiene los usuarios de un evento específico.
     */
    const getUsersInEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { eventId } = req.params;

        try {
            const usersInEvent = await prisma.userInEvent.findMany({
                where: { eventId: parseInt(eventId) },
                include: {
                    user: true,
                    event: { include: { user: true } },
                },
            });

            return res.status(httpStatus.OK).json({
                data: usersInEvent,
                message: "Usuarios del evento obtenidos con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    /**
     * Obtiene todos los eventos asociados a un usuario.
     */
    const getEventsFromUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        try {
            const eventsFromUser = await prisma.userInEvent.findMany({
                where: { userId: parseInt(userId) },
                include: { event: true },
            });

            return res.status(httpStatus.OK).json({
                data: eventsFromUser,
                message: "Eventos del usuario obtenidos con éxito",
            });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
        createEvent,
        joinEvent,
        getEventById,
        updateEvent,
        deleteEvent,
        listEvents,
        addUserToEvent,
        removeUserFromEvent,
        getUsersInEvent,
        getEventsFromUser,
    };
};