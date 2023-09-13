import { UserDocument, UserModel } from "@models/User";
import { FilterQuery, UpdateQuery } from "mongoose";

export class UserService {
  static async find({ query }: { query: FilterQuery<UserDocument> }) {
    return UserModel.findOne(query);
  }

  static async update({
    query,
    update
  }: {
    query: FilterQuery<UserDocument>;
    update: UpdateQuery<UserDocument>;
  }) {
    return UserModel.updateOne(query, update);
  }
}
