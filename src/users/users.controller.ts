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
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
    // Get the promise
    // const list = this.usersService.findAll();
    // // Handle it
    // let users: User[];
    // list.then((l) => l.forEach((user: User) => console.log(`${user.name}`)));
    // list.then((l) => l.forEach((user: User) => users.push(user)));
  }

  @GrpcMethod('UsersService', 'createUser')
  createUser(iUserDto: IUserDto): Promise<User> {
    console.log(`User '${iUserDto.name}' created`);
    const user: User = new User();
    user.dni = iUserDto.dni;
    user.name = iUserDto.name;
    user.email = iUserDto.email;
    user.active = iUserDto.active;
    return this.usersService.create(user);
  }

  @GrpcMethod('UsersService', 'updateUser')
  async updateUser(user: IUser): Promise<UpdateUserDto> {
    console.log(`User #${user.id} updated`);
    await this.usersService.update(user.id, user);
    return this.usersService.findById(user.id);
  }

  @GrpcMethod('UsersService', 'deactivateUser')
  async deactivateUser(iUserById: IUserById): Promise<User> {
    console.log(`User #${iUserById.id} deactivated`);
    const user: User = await this.usersService.findById(iUserById.id);
    user.active = false;
    await this.usersService.update(user.id, user);
    return await this.usersService.findById(user.id);
  }

  @GrpcMethod('UsersService', 'deleteUser')
  async deleteUser(iUserById: IUserById): Promise<User> {
    console.log(`User #${iUserById.id} deleted`);
    const user: User = await this.usersService.findById(iUserById.id);
    await this.usersService.delete(iUserById.id);
    return user;
  }
}
