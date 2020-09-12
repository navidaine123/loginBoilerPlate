import { Application,Router } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { home, protectedRouter, login, logout, register, postRegister, postLogin } from "./router/route.ts";
// import router from "../router/route.ts";
import usermiddleware from "./middleware/usermiddleware.ts"

const app = new Application();

const router = new Router();
app.use(usermiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

router
  .get("/", home)
  .get("/login", login)
  .post("/login", postLogin)
  .get("/register", register)
  .post("/register", postRegister)
  .get("/logout", logout)
  .get("/protected", protectedRouter);



app.addEventListener('error', evt => {
  console.log(evt.error);
});

await app.listen({ port: 8000 });

const port = 8000;
console.log(`listen to port :${port}`);






