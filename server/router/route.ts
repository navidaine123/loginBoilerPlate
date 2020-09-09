import { RouterContext } from "https://deno.land/x/oak@v6.1.0/router.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.8.0/mod.ts";
import {User,users} from "../model/user.model.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";

const key = "your-secret";
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};
;
export const home =async (ctx: RouterContext) => {};
export const login =async (ctx: RouterContext) => {};
export const register =async (ctx: RouterContext) => {};
export const protectedRouter =async (ctx: RouterContext) => {
}
export const postLogin =async (ctx: RouterContext) => {
        const body = await ctx.request.body({type:'form-data'});
        const formdata = await body.value.read();

        const username = (formdata).fields.username;
        const password = (formdata).fields.password;

        const user = users.find(u=>u.username === username );
        if(!user){
                ctx.response.body = {
                        message:"inavalid"
                };
        }
        else if(!await bcrypt.compare(password,user.password)){
                ctx.response.body = {
                        message:"inavalid"
                };
                
        }
        else{
                const payload: Payload = {
                        iss: user.username,
                        exp: setExpiration(new Date().getUTCDate()+60*60*1000),
                      };
                      const jwt = await makeJwt({key,header,payload});
                ctx.response.body = {
                        message:"succes",
                        jwt:jwt
                };
        }

}
export const postRegister = async (ctx: RouterContext) => {
        
        const body = await ctx.request.body({type:'form-data'});
        const formdata = await body.value.read();

        const name = (formdata).fields.name;
        const username = (formdata).fields.username;
        const password = (formdata).fields.password;

        const hash = await bcrypt.hash(password);

        const user:User ={
                name: name,
                password : hash,
                username : username
        }

        users.push(user);
        console.log(user);

}
export const logout =async (ctx: RouterContext) => {
}
