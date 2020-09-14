import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";

export const getRegister = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
  };
};
