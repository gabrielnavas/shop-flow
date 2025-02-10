import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { ErrorExceptionFilter } from 'src/user/filters/error-exception.filter';

@UseFilters(new ErrorExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    await this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authService.signin(body);
  }
}
