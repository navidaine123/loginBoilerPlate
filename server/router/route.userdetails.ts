import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";
import { usersList } from "../service/userService.ts";

export const gteUsersList = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
    data: await usersList(),
  };
};
