import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from './schema/user.schema'
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
  ],

  providers: [
    UserService
  ],
  controllers: [
    UserController
  ]
})
export class UserModule { }
