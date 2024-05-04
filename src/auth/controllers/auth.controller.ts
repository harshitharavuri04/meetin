import { Controller, Get, Req, Res, UseGuards, Post, Body,HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.services';
import { CreateUserDto } from '../dtos/create-user-dto';
import { LoginUserDto } from '../dtos/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    res.redirect('/'); // Redirect to the desired endpoint after successful authentication
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const user = await this.authService.signUp(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto, @Res() res) {
    try {
      const user = await this.authService.signIn(loginUserDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}
