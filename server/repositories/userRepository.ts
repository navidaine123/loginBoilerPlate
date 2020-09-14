import { User } from "../model/userModel.ts";
import { GenericRepository } from "./genericRepository.ts";

export default class UserRepository extends GenericRepository<User> {
  getByusername = async (username: string) =>
    await User.where("UserName", username).first();
}
