import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServivce: UsersService) {}

  @Get()
  getUsers() {
    return this.usersServivce.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersServivce.getUser(id);
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersServivce.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersServivce.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersServivce.deleteUser(id);
  }
}
