import { User } from "../../entity/user.entity";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserDto {
  id?: number

  @Length(5)
  @IsNotEmpty()
  username: string

  password?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  fullName: string

  class?: string
  score?: number
  roles?: string[]
}

export const toUserDto = (data: User): UserDto => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    fullName: data.fullName,
    class: data.class,
    score: data.score,
    roles: data.roles.map(value => value.name)
  };
};

