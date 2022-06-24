import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUsers } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('users')
@ApiTags('ABS - User')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/single')
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Post()
  async createUsers(@Body() users: CreateUsers) {}

  @Get('/list')
  @ApiQuery({ name: 'pagination', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getUsers(
    @Query('pagination') pagination: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    return this.usersService.getUsers(limit, pagination, search);
  }

  @Get('/detail')
  @ApiQuery({ name: 'id', required: true })
  async getUser(@Query('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch()
  @ApiQuery({ name: 'id', required: true })
  async updateUser(@Query('id') id: string, @Body() updateuser: UpdateUserDto) {
    return this.usersService.updateUser(id, updateuser);
  }

  @Delete()
  @ApiQuery({ name: 'id', required: true })
  async deleteUser(@Query('id') id: string) {
    return this.usersService.deleteUser(id);
  }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
