import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity/User";
import {redis} from "../../../redis";

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string): Promise<boolean> {
        //@ts-ignore
        const userId = await redis?.get(token);

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        //@ts-ignore
        await redis?.del(token);

        return true;
    }
}