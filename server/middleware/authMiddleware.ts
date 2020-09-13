import { Context } from "https://deno.land/x/oak@v6.1.0/context.ts";

import {
  validateJwt,
  parseAndDecode,
  Payload,
} from "https://deno.land/x/djwt/validate.ts";

const userMiddleware = async (
  ctx: Context<httpContextState>,
  next: Function,
) => {
  const jwt = ctx.request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(jwt);
  if (jwt) {
    const validate = await validateJwt(
      { jwt, key: "your-secret", algorithm: "HS256" },
    );
    const data = parseAndDecode(validate.jwt + "");

    console.log(data);

    const jwtpayload = data.payload as jwtPayload;
    if (data) {
      ctx.state.currentUser = jwtpayload;
    } else {
      ctx.response.status = 500;
      ctx.state.currentUser = null;
    }

    await next();
  } else {
    ctx.state.currentUser = null;
  }
};
export default userMiddleware;

interface jwtPayload extends httpContextUser {
  exp: number;
  iat: number;
}

interface httpContextState {
  currentUser: httpContextUser | null;
}

interface httpContextUser {
  id: string;
  userName: string;
  roles: string[];
}
