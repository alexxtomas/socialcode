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
    avatar: { type: String, default: "https://i.imgur.com/6VBx3io.png" },
    bio: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    snippets: [{ type: Schema.Types.ObjectId, ref: "Snippet" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

type User = Omit<InferSchemaType<typeof UserSchema>, "createdAt" | "updatedAt">;

export type UserDocument = InferSchemaType<typeof UserSchema> & Document & UserMethods;

UserSchema.pre("save", async function preSaveCallback(next) {
  const user = this as UserDocument;
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

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.password;
  }
});

const UserModel = model<UserDocument>("User", UserSchema);

export { User, UserModel };
