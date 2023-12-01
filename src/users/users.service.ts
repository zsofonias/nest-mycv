import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  async getUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        `No user found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  createUser(createUserDto: CreateUserDTO) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`);
    }

    return this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);

    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`);
    }

    return this.usersRepository.remove(user);
  }
}
