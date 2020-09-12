import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";
import { User, users } from "../model/user.model.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import{loginDto} from "../service/dto/logindto.ts"
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { signupDto } from "../service/dto/signupdto.ts";
import { generate } from "https://deno.land/std@0.68.0/uuid/v4.ts";

const key = "your-secret";
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const home = async (ctx: RouterContext) => {};
export const login = async (ctx: RouterContext) => {};
export const register = async (ctx: RouterContext) => {};

export const protectedRouter = async (ctx: RouterContext) => {};
export const postLogin = async (ctx: RouterContext) => {
  const body = await ctx.request.body({ type: "form-data" });
  const formdata = await body.value.read();
  
  const dto: loginDto ={
    username : (formdata).fields.username,
    password:(formdata).fields.password
  };
  

  const user = users.find((u) => u.username === dto.username);
  if (!user) {
    ctx.response.body = {
      message: "inavalid",
    };
  } else if (!await bcrypt.compare(dto.password, user.password)) {
    ctx.response.body = {
      message: "inavalid",
    };
  } else {
    const payload: Payload = {
      iss: user.username,
      exp: setExpiration(new Date().getUTCDate() + 60 * 60 * 1000),
      id: user.id,
      userName: user.username,
    };
    const jwt = await makeJwt({ key, header, payload });
    ctx.response.body = {
      message: "succes",
      jwt: jwt,
    };
  }
};
export const postRegister = async (ctx: RouterContext) => {
  const body = await ctx.request.body({ type: "form-data" });
  const formdata = await body.value.read();

  const dto :signupDto={
    name:(formdata).fields.name,
    password:(formdata).fields.password,
    username:(formdata).fields.username
  }

  const hash = await bcrypt.hash(dto.password);

  const user: User = {
    id: generate(),
    name: dto.name,
    password: hash,
    username: dto.username,
  };

  users.push(user);
};
export const logout = async (ctx: RouterContext) => {
  ctx.state.currentuser = null;
  ctx.response.redirect("/login");
};
