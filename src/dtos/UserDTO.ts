import { IsEmail, IsString, Length } from "class-validator";

export class UserDTO {
  @IsString()
  @Length(3, 20)
  name!: string;

  @IsEmail()
  email!: string;
}
