import { Database } from "https://deno.land/x/denodb/mod.ts";

const DbContext = new Database("postgres", {
  database: "zgkptixc",
  host:
    "postgres://zgkptixc:DjYKwd_7pn1Df20HqD-7Nno_JzSmvWSC@lallah.db.elephantsql.com:5432/zgkptixc",
  username: "zgkptixc",
  password: "DjYKwd_7pn1Df20HqD-7Nno_JzSmvWSC",
  port: 5432,
} // optional
);

export default DbContext;
