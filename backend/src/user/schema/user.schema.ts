
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { USER_ROLE } from "../enums/user.role";

export type IUser = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ default: USER_ROLE.USER })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
