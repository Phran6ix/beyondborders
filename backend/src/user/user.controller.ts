import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpDTO } from "./dto/sign-up.dto";
import { SignInDTO } from "./dto/sign-in.dto";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Post("/auth/sign-up")
  async UserSignUp(@Body() body: SignUpDTO) {
    const data = await this.userService.SignUp(body)
    return { message: "User sign up successful", data }
  }

  @Post("/auth/sign-in")
  async UserSignIn(@Body() body: SignInDTO) {
    const data = await this.userService.SignIn(body)
    return { message: "User sign in successful", data }
  }
}
