import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";
import { register } from "../service/userService.ts";

export const getRegister = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
  };
};

export const postRegister = async (ctx: RouterContext) => {
  const body = await ctx.request.body({ type: "form-data" });
  ctx.response.body = await register(body);
};
