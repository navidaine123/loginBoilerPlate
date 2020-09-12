import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";
import DbContext from '../database/posgresql.ts';

class User extends Model {
  // ...

  static table = 'User';

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    FirstName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull :true
    },
    LastName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull :true
    },
    UserName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull :true
    },
    Email: {
      type: DataTypes.STRING,
      length: 50,
      allowNull :true
    },
    Password: {
      type: DataTypes.STRING,
      length: 50,
      allowNull :true
    },
  };
}

export default async function createDB(){
const context = DbContext;
context.link([User]);
await context.sync({drop: true});
await User.create({ FirstName: 'Amelia' });
const navid = await User.find(1);
navid.FirstName = 'navid';
navid.update();
console.log(await User.select().all());
}