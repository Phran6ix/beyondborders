import { IsEmail, IsNotEmpty } from "class-validator"

export class SignUpDTO {
  @IsNotEmpty()
  firstname: string

  @IsNotEmpty()
  lastname: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}


