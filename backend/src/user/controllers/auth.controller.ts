import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from '../types';
import { AuthService } from '../services/auth.service';
import { UserAlreadyExistsEmail } from '../exceptions/user-already-exists-email';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    try {
      await this.authService.signup(body);
    } catch (err) {
      if (err instanceof UserAlreadyExistsEmail) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Ocorreu um problema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authService.signin(body);
  }
}
