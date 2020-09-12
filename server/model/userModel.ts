import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";
import DbContext from '../database/posgresql.ts';

class User extends Model {
  // ...

  static table = 'User';

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    FirstName: {
      type: DataTypes.STRING,
      length: 50,
    },
    LastName: {
      type: DataTypes.STRING,
      length: 50,
    },
    UserName: {
      type: DataTypes.STRING,
      length: 50,
    },
    Email: {
      type: DataTypes.STRING,
      length: 50,
    },
    Password: {
      type: DataTypes.STRING,
      length: 50,
    },
  };
}

export default async function createDB(){
const context = DbContext;
console.log('start');
context.link([User]);
console.log('link');
await context.sync({drop: true});
console.log('sync');
await User.create({ FirstName: 'Amelia' });
console.log('create');
console.log(await User.select().all());
}