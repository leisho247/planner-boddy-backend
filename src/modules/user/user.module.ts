import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import PrismaService from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService, // Usa la configuración centralizada
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService], // Exportar el servicio si otro módulo necesita acceder a la lógica de usuarios
})
export class UserModule {}
