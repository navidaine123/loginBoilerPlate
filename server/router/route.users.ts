import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";
import {
  usersList,
  user,
  updateUser,
  deleteUser,
  createUser,
} from "../service/userService.ts";

export const postCreate = async (ctx: RouterContext) => {
  const body = await ctx.request.body({ type: "form-data" });
  ctx.response.body = await createUser(body);
};
export const getUsersList = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
    data: await usersList(),
  };
};

export const getUser = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: 200,
    data: await user(ctx.params.id),
  };
};

export const postupdateUser = async (ctx: RouterContext) => {
  console.log("update");
  ctx.response.body = {
    status: 200,
    data: await updateUser(
      ctx.params.id,
      await ctx.request.body({ type: "form-data" }),
    ),
  };
};
export const delUser = async (ctx: RouterContext) => {
  ctx.response.body = {
    status: await deleteUser(ctx.params.id) ? 200 : 400,
  };
};
