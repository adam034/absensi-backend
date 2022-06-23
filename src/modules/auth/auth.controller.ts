import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { changePassword } from './dto/change-password.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { refreshToken } from './dto/refresh-token.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
@ApiTags('ABS - Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: 201, type: CreateAuthDto, description: 'login user' })
  async login(@Body() auth: CreateAuthDto) {
    return this.authService.login(auth);
  }

  @Post('/changepassword')
  async changePassword(@Body() password: changePassword, @Req() req: any) {
    const { user_id } = req.user;
    return this.authService.changePassword(password, user_id);
  }

  @Post('/refreshtoken')
  async refreshToken(@Body() credential: refreshToken, @Req() req: any) {
    const { user_id } = req.user;
    return this.authService.refreshToken(credential, user_id);
  }

  @Post('/logout')
  async logout(@Req() req: any) {
    const { user_id } = req.user;
    return this.authService.logout(user_id);
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
