import { MiddlewareFn } from "type-graphql";
import {MyContext} from "../types";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    //@ts-ignore
    if (!context.req.session!.userId) {
        throw new Error("not authenticated");
    }
    //go ahead to the next resolver
    return next();
};