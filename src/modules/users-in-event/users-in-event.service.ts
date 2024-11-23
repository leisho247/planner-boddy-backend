import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersInEventService {
  async getUsersInEvent(eventId: number) {
    try {
      const usersInEvent = await prisma.userInEvent.findMany({
        where: { eventId },
        include: { user: true },
      });

      if (!usersInEvent || usersInEvent.length === 0) {
        throw new NotFoundException('Event not found or no users in event');
      }

      return usersInEvent.map((ue) => ue.user);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getEventsForUser(userId: number) {
    try {
      const eventsForUser = await prisma.userInEvent.findMany({
        where: { userId },
        include: { event: true },
      });

      if (!eventsForUser || eventsForUser.length === 0) {
        throw new NotFoundException('User not found or no events for user');
      }

      return eventsForUser.map((ue) => ue.event);
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}