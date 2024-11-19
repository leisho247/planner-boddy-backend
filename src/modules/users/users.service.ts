import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encrypt, verified } from '../utils/bcrypt';
import { generateToken, verifyToken } from '../utils/jwt.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const hashPass = await encrypt(registerDto.password);
    const data = { ...registerDto, password: hashPass };

    try {
      const createdUser = await this.prisma.user.create({ data });

      const token = generateToken({ id: createdUser.id, email: createdUser.email });

      return {
        data: createdUser,
        token,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.code === 'P2002') {
        const field = error.meta.target[0];
        let message = 'Ya existe un usuario registrado con ese ';
        message += field === 'email' ? 'email.' : 'nombre de usuario.';
        throw new BadRequestException({ message });
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const isMatch = await verified(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
      data: user,
      token,
      message: 'Successfully logged in.',
    };
  }

  async logout(res: any) {
    res.cookie('token', '', { expires: new Date(0) });
    return { message: 'Logged out.' };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await encrypt(updateUserDto.password);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return {
        data: updatedUser,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async profile(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      data: user,
      message: 'User retrieved successfully',
    };
  }

  async verify(token: string) {
    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedException('Invalid token.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      data: user,
      message: 'Token is valid.',
    };
  }
}
