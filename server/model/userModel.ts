import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";

export class User extends Model {
  // ...

  static table = "User";
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    FirstName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: true,
    },

    LastName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: true,
    },

    UserName: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: true,
    },

    Email: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: true,
    },

    Password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  id!: string;
  FirstName!: string;
  LastName!: string;
  UserName!: string;
  Email!: string;
  Password!: string;

  // save = super.save;

  // update = super.update;

  // delete() {
  //   return super.delete();
  // }
}
