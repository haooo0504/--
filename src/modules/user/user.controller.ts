import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { Role } from '../role/role.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用戶模塊')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('jwt')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  @Role('admin')
  // @UseGuards(AuthGuard('jwt'))
  hello() {
    return 'hello world';
  }
}
