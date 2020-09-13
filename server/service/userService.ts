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
import usersListDto from "./dto/usersList.dto.ts";

const key = "your-secret";
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const userRepo = new UserRepository(User);
export const login = async (body: BodyFormData): Promise<loginResponseDto> => {
  const formdata = await body.value.read();
  const dto: loginDto = {
    UserName: formdata.fields.userName,
    Password: formdata.fields.password,
  };
  let responseDto: loginResponseDto = {
    message: "",
    jwt: null,
  };
  const user = await userRepo.getByusername(dto.UserName);
  if (!user) {
    responseDto = {
      message: "invalid",
      jwt: null,
    };
  } else if (!await bcrypt.compare(dto.Password, user.Password)) {
    responseDto = {
      message: "inavalid",
      jwt: null,
    };
  } else {
    const payload: Payload = {
      iss: user.UserName,
      exp: setExpiration(new Date().getUTCDate() + 60 * 60 * 1000),
      id: user.Id,
      userName: user.UserName,
    };
    const jwt = await makeJwt({ key, header, payload });
    responseDto = {
      message: "succes",
      jwt: jwt,
    };
  }
  return responseDto;
};

export const register = async (
  body: BodyFormData,
): Promise<regiterResponseDto> => {
  const formdata = await (await body.value.read()).fields;

  const newuser = new User();
  newuser.LastName = (formdata).lastname;
  newuser.FirstName = (formdata).firstname;
  newuser.UserName = (formdata).username;
  newuser.Email = (formdata).email;
  const salt = await bcrypt.genSalt(15);
  newuser.Password = await bcrypt.hash((formdata).password, salt);

  const res = await userRepo.create(newuser);

  let responseDto: regiterResponseDto = {
    message: "created",
  };

  return responseDto;
};

export const usersList = async (): Promise<Array<usersListDto>> => {
  const user = await userRepo.find(0);
  console.log(user);
  const users = await userRepo.getAll();

  let usersRes: usersListDto[] = [];

  users.forEach((element) => {
    const dto: usersListDto = {
      id: element.Id,
      firstname: element.FirstName,
      lastname: element.LastName,
      email: element.Email,
      usrename: element.UserName,
    };

    usersRes.push(dto);
  });

  return usersRes;
};
