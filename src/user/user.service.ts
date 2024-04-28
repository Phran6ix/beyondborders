import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { IUser, User } from "./schema/user.schema";
import { Model } from "mongoose";
import { SignUpDTO } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt"
import { SignInDTO } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async SignUp(payload: SignUpDTO): Promise<unknown> {

    const userExist = await this.userModel.exists({ email: payload.email })
    if (userExist) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
    }
    const salt = await bcrypt.genSalt()
    const password = bcrypt.hash(payload.password, salt)

    const newUser = new this.userModel({ ...payload, password })
    await newUser.save()
    return
  }

  async SignIn(payload: SignInDTO): Promise<{ user: IUser, token: string }> {
    const user = await this.userModel.findOne({
      email: payload.email
    })

    if (!user) {
      throw new NotFoundException("User with email does not exist")
    }

    const token = this.jwtService.sign({ id: user._id })
    return { user, token }
  }
}
