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

  async findAll(){
    let data = await this.userRepository.find();
    // Wrap the data to comply with .proto file declaration
    // Make sure to use EXACTLY the same repeated variable name used in .proto
    return { user: data };
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(`This action updated user #${id}`);
    this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async delete(id: number) {
    console.log(`This action removed user #${id}`);
    await this.userRepository.delete(id);
  }
}
