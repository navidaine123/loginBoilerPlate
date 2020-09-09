import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt@v1.2/create.ts";
import { user } from "../model/user.model.ts";

const key = "navid";
const payload: Payload = {
  iss: "joe",
  exp: setExpiration(60),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const generateJwt = async (user:user) => {
    const payload: Payload = {
    iss: user.username,
    exp: setExpiration(new Date().getTime() + 600000 ),
  };
}