import { Context } from "https://deno.land/x/oak@v6.1.0/context.ts";
import { validateJwt, parseAndDecode } from "https://deno.land/x/djwt/validate.ts";
import { Status } from "https://deno.land/std@0.67.0/http/http_status.ts";
import { users } from "../model/user.model.ts";

const userMiddleware = async (ctx: Context, next: Function) => {
  const jwt = ctx.request.headers.get("Authorization")?.split('Bearer ')[1];
  console.log(jwt);
  if (jwt) {
    const validate = await validateJwt({ jwt, key: "your-secret", algorithm: "HS256" });
    const data = parseAndDecode(validate.jwt + "");
    console.log(data);

    if(data){

    }
    else{
    }
  }
  
  await next();
};

export default userMiddleware;
