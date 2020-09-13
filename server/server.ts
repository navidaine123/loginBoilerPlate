import { Application, Router } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import {
  gteUsersList,
} from "./router/route.userdetails.ts";

import {
  getLogin,
  postLogin,
} from "./router/route.login.ts";

import {
  getRegister,
  postRegister,
} from "./router/route.register.ts";

import authMiddleware from "./middleware/authMiddleware.ts";
import { createDB } from "./database/posgresql.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router
  .get("/login", getLogin)
  .post("/login", postLogin)
  .get("/register", getRegister)
  .post("/register", postRegister)
  .get("/users", gteUsersList);

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

createDB();

const port = 8000;
console.log(`listen to port :${port}`);
await app.listen({ port: 8000 });
