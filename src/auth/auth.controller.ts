import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用戶驗證模塊')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '用戶登入',
  })
  public async userlogin(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }

  @Post('regist')
  @ApiOperation({
    summary: '用戶進行註冊',
  })
  async registUser(@Body() userDto: User) {
    return await this.authService.regist(userDto);
  }

  @Post('alter')
  @ApiOperation({
    summary: '用戶修改接口',
  })
  public async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }
}
