import { Schema, InferSchemaType, model, Document } from "mongoose";
import bycript from "bcrypt";
import { config } from "@config/index";

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

type User = InferSchemaType<typeof UserSchema>;

type UserExtended = User & Document & UserMethods;

UserSchema.pre("save", async function preSaveCallback(next) {
  const user = this as UserExtended;
  if (!user.isModified("password")) {
    return next();
  }

  const hash = bycript.hashSync(user.password, config.saltRounds);
  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
  const user = this as User;
  return bycript.compare(candidatePassword, user.password).catch(() => {
    return false;
  });
};

const UserModel = model("User", UserSchema);

export { User, UserModel };
