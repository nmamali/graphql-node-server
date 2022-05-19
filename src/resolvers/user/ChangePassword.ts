import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import {redis} from "../../../redis";
import {MyContext} from "../../types";
import {forgotPasswordPrefix} from "../../constants/redisPrefixes";
import {ChangePasswordInput} from "./inputTypes/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data")
            { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        //@ts-ignore
        const userId = await redis.get(forgotPasswordPrefix + token);
        if (!userId) {
            return null;
        }

        const user = await User.findOne({ where: { id:userId } });

        if (!user) {
            return null;
        }

        user.password = await bcrypt.hash(password, 12);
        //ts-ignore
        await user.save() //update password

        //@ts-ignore
        ctx.req.session!.userId = user.id; // keep the users loggedin
        //@ts-ignore
        await redis.del(forgotPasswordPrefix + token);

        return user;
    }
}