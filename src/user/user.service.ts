import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { User } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { toUserDto, UserDto } from "./dto/user.dto";
import { Role } from "../entity/role.entity";
import { ErrorConstant } from "../shared/constants/error.constant";
import * as bcrypt from 'bcrypt';
import { Constant } from "../shared/constants/constant";

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  findAllUser(): Promise<UserDto[]> {
    return this.userRepository.find().then(value => value.map(user => toUserDto(user)));
  }

  async createUser(userDto: UserDto): Promise<UserDto | undefined> {
    if (userDto.id != null) throw new BadRequestException();
    if (!userDto.password || userDto.password.length < 5) throw new BadRequestException({message: "password must be longer than or equal to 5 characters", error: "Bad Request"})

    const roles: Role[] = [];
    for (const roleName of userDto.roles) {
      const role = await this.roleRepository.findOne({ name: roleName });
      if (role) roles.push(role);
    }

    const hash = await bcrypt.hash(userDto.password, Constant.SALT);

    return this.userRepository.save({
      ...userDto,
      roles: roles,
      password: hash
    }).then(value => toUserDto(value)).catch(error => {
      if (error.code === ErrorConstant.DUPLICATE_ENTRY_ERROR) throw new ConflictException();
      else throw new InternalServerErrorException();
    });
  }

  async updateUser(userDto: UserDto): Promise<UserDto | undefined> {
    if (userDto.id == null) throw new BadRequestException();

    const originalUser = await this.userRepository.findOne({ id: userDto.id });
    if (!originalUser) throw new NotFoundException();

    const updatedRoles: Role[] = [];
    for (const roleName of userDto.roles) {
      const role = await this.roleRepository.findOne({ name: roleName });
      if (role) updatedRoles.push(role);
    }

    return this.userRepository.save({
      ...userDto,
      roles: updatedRoles,
      password: originalUser.password
    }).then(toUserDto).catch(error => {
      if (error.code === ErrorConstant.DUPLICATE_ENTRY_ERROR) throw new ConflictException();
      else throw new InternalServerErrorException();
    });

  }

  findOneByUsername(username: string): Promise<UserDto | undefined> {
    return this.userRepository.findOne({ username }).then(value => {
      if (value) return toUserDto(value);
      else throw new NotFoundException();
    });
  }

  async deleteUser(username: string) {
    const user = await this.userRepository.findOne({ username })
    if (!user) throw new NotFoundException();
    return this.userRepository.remove(user)
  }
}
