import { BodyFormData } from "https://deno.land/x/oak@v6.1.0/body.ts";
import { loginDto } from "./dto/logindto.ts";
import { loginResponseDto } from "./dto/loginResponse.dto.ts";
import UserRepository from "../repositories/userRepository.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import regiterResponseDto from "./dto/register.response.dto.ts";
import { User } from "../model/userModel.ts";
import userDto from "./dto/user.dto.ts";

const key = "your-secret";
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const userRepo = new UserRepository(User);
export const login = async (body: BodyFormData): Promise<string> => {
  const formdata = await body.value.read();
  const dto: loginDto = {
    UserName: formdata.fields.username,
    Password: formdata.fields.password,
  };
  let res = "";
  const user = await userRepo.getByusername(dto.UserName);

  if (!user) {
    res = "notFound"
  } else if (!await bcrypt.compare(dto.Password, user.Password)) {
    console.log(dto.Password + '####' + dto.UserName);
    console.log(await bcrypt.hash(dto.Password, user.Password.slice(0, 29)));
    console.log(JSON.stringify(user))
    res = "wrongPassword"
  } else {
    const payload: Payload = {
      iss: user.UserName,
      exp: setExpiration(new Date().getUTCDate() + 60 * 60 * 1000),
      id: user.Id,
      userName: user.UserName,
    };
    const jwt = await makeJwt({ key, header, payload });
    res = jwt;
  }
  return res;
};

export const createUser = async (
  body: BodyFormData,
): Promise<regiterResponseDto> => {
  const formdata = await (await body.value.read()).fields;

  const newuser = new User();
  newuser.LastName = (formdata).lastname;
  newuser.FirstName = (formdata).firstname;
  newuser.UserName = (formdata).username;
  newuser.Email = (formdata).email;
  const salt = await bcrypt.genSalt(12);
  newuser.Password = await bcrypt.hash((formdata).password, salt);
  console.log(JSON.stringify(formdata))
  const res = await userRepo.create(newuser);

  let responseDto: regiterResponseDto = {
    message: "created",
  };

  return responseDto;
};

export const user = async (id: string | undefined): Promise<userDto> => {
  const user: User = await userRepo.find(id);

  let userRes: userDto = {
    id: user.id,
    email: user.Email,
    firstname: user.FirstName,
    lastname: user.LastName,
    usrename: user.UserName,
  };

  return userRes;
};

export const usersList = async (): Promise<Array<userDto>> => {
  const users = await userRepo.getAll();

  let usersRes: userDto[] = [];

  users.forEach((element) => {
    const dto: userDto = {
      id: element.id,
      firstname: element.FirstName,
      lastname: element.LastName,
      email: element.Email,
      usrename: element.UserName,
    };

    usersRes.push(dto);
  });

  return usersRes;
};

export const updateUser = async (
  id: string | undefined,
  body: BodyFormData,
): Promise<userDto> => {
  const formdata = (await body.value.read()).fields;

  const user: User = await userRepo.find(id);
  console.log(user);
  user.FirstName = (formdata).firstname;
  user.LastName = (formdata).lastname;
  user.UserName = (formdata).username;
  user.Email = (formdata).email;
  // const salt = await bcrypt.genSalt(15);
  // user.Password = await bcrypt.hash((formdata).password, salt);

  await userRepo.update(user);

  const userRes: userDto = {
    id: user.id,
    email: user.Email,
    firstname: user.FirstName,
    lastname: user.LastName,
    usrename: user.UserName,
  };
  return userRes;
};

export const deleteUser = async (id: string | undefined): Promise<boolean> => {
  try {
    const user = await userRepo.find(id);

    await userRepo.delete(user);

    return true;
  } catch (error) {
    return false;
  }
};
