import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully.',
      data: user,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully.',
      data: user,
    };
  }
}
