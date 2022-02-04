import {
  Body,
  ConflictException,
  Controller, Delete,
  Get,
  InternalServerErrorException, Param,
  Post,
  Put,
  Request,
  Response,
  UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";
import { QueryFailedError } from "typeorm";
import { ErrorConstant } from "../shared/constants/error.constant";
import { IsNotEmpty } from "class-validator";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get()
  getAllUsers() {
    return this.userService.findAllUser();
  }

  @Get(":username")
  getOneUser(@Param() params) {
    return this.userService.findOneByUsername(params.username);
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Put()
  updateUser(@Body() userDto: UserDto) {
    return this.userService.updateUser(userDto);
  }

  @Delete(':username')
  deleteUser(@Param() params) {
    return this.userService.deleteUser(params.username);
  }
}
