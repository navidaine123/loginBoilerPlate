import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";

import { login } from "../service/userService.ts";

export const getLogin = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
  };
};

export const postLogin = async (ctx: RouterContext) => {
  const body = await ctx.request.body({ type: "form-data" });
  // ctx.response.body = (await body.value.read()).fields;
  const res = await login(body);
  switch (res) {
    case "notFound": {
      ctx.response.status = 404;
      break;
    }
    case "wrongPassword": {
      ctx.response.status = 401;
      break;
    }
    default: {
      ctx.response.status = 200;
      ctx.response.body = {
        jwt: res
      }
      break;
    }

  }
};
