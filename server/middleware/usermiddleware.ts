import { Context } from "https://deno.land/x/oak@v6.1.0/context.ts";
import { validateJwt, parseAndDecode} from "https://deno.land/x/djwt/validate.ts";
import { Status } from "https://deno.land/std@0.67.0/http/http_status.ts";
import { users } from "../model/user.model.ts";
import { User } from "../model/user.model.ts"

const userMiddleware = async (ctx: Context, next: Function) => {
  const jwt = ctx.request.headers.get("Authorization")?.split('Bearer ')[1];
  console.log(jwt);
  if (jwt) {
    const validate = await validateJwt({ jwt, key: "your-secret", algorithm: "HS256" });
    const data = parseAndDecode(validate.jwt + "");
    const a = data.payload as jwtPayload;
    if(data){
      const user = users.find((u:User) => u.username  === a.iss);
      ctx.state.currentuser = user;
    }
    else{
      ctx.response.status = 500;
    }
  }
  
  await next();
};

export default userMiddleware;

interface jwtPayload  {
  iss: string;
  exp: number;
}
