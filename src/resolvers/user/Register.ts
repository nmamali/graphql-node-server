import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import * as bcrypt from "bcryptjs";
import {User} from "../../entity/User";
import {RegisterInput} from "../../validationsAndInputTypes/RegisterInput";
import {isAuth} from "../../middlewares/isAuth";

@Resolver()
export class RegisterResolver {


    @UseMiddleware(isAuth)
    @Query(() => String)
    async helloWorld() {
        return "Hello World!";
    }
    @Mutation(() => User)
    async register(@Arg("input")
                       {
                           email,
                           firstName,
                           lastName,
                           password
                       }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isDeleted: false
        }).save();

        return user;
    }
}