import { UserDocument, UserModel } from "@models/User";
import { FilterQuery } from "mongoose";

export class UserService {
  static async find({ query }: { query: FilterQuery<UserDocument> }) {
    return UserModel.findOne(query);
  }
}
