import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(`This action created user ${createUserDto.name}`);
    return await this.userRepository.save(createUserDto);
  }

  async findById(id: number): Promise<User> {
    console.log(`This action found user by id: ${id}`);
    return await this.userRepository.findOne(id);
  }

  async findByDni(dni: number): Promise<User> {
    console.log(`This action found user by dni: ${dni}`);
    return await this.userRepository.findOne(dni);
  }

  async findByName(name: string): Promise<User> {
    console.log(`This action found user by name: ${name}`);
    return await this.userRepository.findOne(name);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    console.log(`This action updated user #${id}`);
    await this.userRepository.update(id, updateUserDto);
    return;
  }

  async delete(id: number): Promise<void> {
    console.log(`This action removed user #${id}`);
    await this.userRepository.delete(id);
  }
}
