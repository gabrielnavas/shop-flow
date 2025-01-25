import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../types';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    await this.authService.signup(body);
  }
}
