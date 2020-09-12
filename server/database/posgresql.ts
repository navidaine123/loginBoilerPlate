import { Database } from "https://deno.land/x/denodb/mod.ts";

const DbContext = new Database("postgres", {
  database: "User",
  host:
    "localhost",
  username: "Navid",
  password: "navid123agha",
  port: 5432,
} // optional
);

export default DbContext;
