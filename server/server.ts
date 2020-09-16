import { Application, Router } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import {
  postCreate,
  getUsersList,
  getUser,
  postupdateUser,
  delUser,
} from "./router/route.users.ts";

import {
  getLogin,
  postLogin,
} from "./router/route.login.ts";

import {
  getRegister,
} from "./router/route.register.ts";

import authMiddleware from "./middleware/authMiddleware.ts";
import { createDB } from "./database/posgresql.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

router
  .get("/login", getLogin)
  .post("/login", postLogin)
  .get("/register", getRegister)
  .post("/users", postCreate)
  .get("/users", authMiddleware, getUsersList)
  .get("/users/:id", authMiddleware, getUser)
  .put("/users/:id", authMiddleware, postupdateUser)
  .delete("/users/:id", authMiddleware, delUser);

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

createDB();

const port = 8000;
console.log(`listen to port :${port}`);
await app.listen({ port: 8000 });
