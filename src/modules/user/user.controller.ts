import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerData: any) {
    return this.userService.register(registerData);
  }

  @Post('login')
  async login(@Body() loginData: any) {
    return this.userService.login(loginData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const user = req.user;
    return this.userService.logout(user);
  }
}
