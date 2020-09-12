import { Context } from "https://deno.land/x/oak@v6.1.0/context.ts";

export const authMiddleware = async (ctx: Context, next: Function) => {
    if(!ctx.state.currentuser){
        ctx.response.redirect('/login');
    }
    else{
        await next();
    }
  };