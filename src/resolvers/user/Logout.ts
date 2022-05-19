import { Resolver, Mutation, Ctx } from "type-graphql";
import {MyContext} from "../../types";

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        return new Promise((res, rej) =>
            ctx.req.session!.destroy(err => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }
                //@ts-ignore
                ctx.res.clearCookie("qid");
                return res(true);
            })
        );
    }
}