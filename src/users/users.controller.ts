import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'findById')
  findById(iUserById: IUserById): Promise<User> {
    return this.usersService.findById(iUserById.id);
  }

  @GrpcMethod('UsersService', 'findAll')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @GrpcMethod('UsersService', 'createUser')
  createUser(iUserDto: IUserDto): Promise<User> {
    console.log(`${iUserDto.name}`);
    const user: User = new User();
    user.dni = iUserDto.dni;
    user.name = iUserDto.name;
    user.email = iUserDto.email;
    user.active = iUserDto.active;
    return this.usersService.create(user);
  }

  @GrpcMethod('UsersService', 'updateUser')
  async updateUser(user: IUser): Promise<UpdateUserDto> {
    console.log(`${(user.id, user.dni, user.name, user.email, user.active)}`);
    return this.usersService.update(user.id, user);
  }

  @GrpcMethod('UsersService', 'deactivateUser')
  async deactivateUser(iUserById: IUserById): Promise<User> {
    const user: User = await this.usersService.findById(iUserById.id);
    user.active = false;
    await this.usersService.update(user.id, user);
    return await this.usersService.findById(iUserById.id);
  }

  @GrpcMethod('UsersService', 'deleteUser')
  deleteUser(iUserById: IUserById) {
    this.usersService.delete(iUserById.id);
  }
}
