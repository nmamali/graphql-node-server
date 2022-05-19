import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";
import {MyContext} from "../../types";

@Resolver()
export class LoggedInUserResolver {
    @Query(() => User, { nullable: true })
    async loggedInUser(@Ctx() ctx: MyContext): Promise<undefined> {
        //@ts-ignore
        if (!ctx.req.session!.userId) {
            return undefined;
        }
        //@ts-ignore
        return User.findOne({ where: { id: ctx.req.session!.userId} });
    }
}