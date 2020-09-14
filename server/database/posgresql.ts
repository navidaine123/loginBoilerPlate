import { Database } from "https://deno.land/x/denodb/mod.ts";
import {
  User,
} from "../model/userModel.ts";

export const DbContext = new Database("postgres", {
  database: "User",
  host: "localhost",
  username: "Navid",
  password: "navid123agha",
  port: 5432,
} // optional
);

export async function createDB() {
  const context = DbContext;
  context.link([User]);
  await context.sync({ drop: false });
}
