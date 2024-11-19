import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Req, 
    Res, 
    UsePipes, 
    ValidationPipe, 
    HttpCode, 
    HttpStatus, 
    Query 
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { Request, Response } from 'express';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
      const result = await this.usersService.register(registerDto);
      res.cookie('token', result.token, { httpOnly: true, secure: true, sameSite: 'None' });
      return res.status(HttpStatus.CREATED).json(result);
    }
  
    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
      const result = await this.usersService.login(loginDto);
      res.cookie('token', result.token, { httpOnly: true, secure: true, sameSite: 'None' });
      return res.status(HttpStatus.OK).json(result);
    }
  
    @Get('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res() res: Response) {
      const result = await this.usersService.logout(res);
      res.cookie('token', '', { expires: new Date(0) });
      return res.json(result);
    }
  
    @Post('update')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async update(
      @Body() updateUserDto: UpdateUserDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      const token = req.cookies.token;
      const decoded = verifyToken(token);
      const id = decoded.id;
  
      const result = await this.usersService.update(id, updateUserDto);
      return res.status(HttpStatus.OK).json(result);
    }
  
    @Delete('delete')
    @HttpCode(HttpStatus.OK)
    async deleteById(@Req() req: Request, @Res() res: Response) {
      const token = req.cookies.token;
      const decoded = verifyToken(token);
      const id = decoded.id;
  
      const result = await this.usersService.deleteById(id);
      res.cookie('token', '', { expires: new Date(0) });
      return res.json(result);
    }
  
    @Get('profile')
    async profile(@Query('id') id: string, @Res() res: Response) {
      const userId = Number(id);
      const result = await this.usersService.profile(userId);
      return res.status(HttpStatus.OK).json(result);
    }
  
    @Get('verify')
    async verify(@Req() req: Request, @Res() res: Response) {
      const token = req.cookies.token;
      const result = await this.usersService.verify(token);
      return res.status(HttpStatus.OK).json(result);
    }
  }
  