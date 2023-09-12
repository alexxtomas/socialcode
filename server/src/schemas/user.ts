/* eslint-disable camelcase */
import { UserModel } from "@models/User";
import { passwordRegex } from "@utils/regex";
import z from "zod";

const username = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string"
  })
  .min(3, { message: "Username cannot be less than 3 characters" })
  .max(255, { message: "Username must be less than 255 characters" });

const fullName = z
  .string({
    required_error: "Fullname is required",
    invalid_type_error: "Fullname must be a string"
  })
  .min(3, { message: "Fullname cannot be less than 3 characters" })
  .max(255, { message: "Fullname must be less than 255 characters" });

const email = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  })
  .email({ message: "Email is invalid" });

const password = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
  .regex(passwordRegex, {
    message:
      "Password is must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
  });

const avatar = z
  .string({
    invalid_type_error: "Avatar must be a string"
  })
  .url({ message: "Avatar is invalid" })
  .optional();

const bio = z
  .string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  })
  .min(3, { message: "Description cannot be less than 3 characters" })
  .max(500, { message: "Description must be less than 500 characters" });

export const userSchema = z.object({
  username,
  fullName,
  email,
  password,
  avatar,
  bio,
  followers: z.array(z.string(), {
    required_error: "Followers is required",
    invalid_type_error: "Followers must be an array of strings"
  }),
  following: z.array(z.string(), {
    required_error: "Following is required",
    invalid_type_error: "Following must be an array of strings"
  }),
  snippets: z.array(z.string(), {
    required_error: "Snippets is required",
    invalid_type_error: "Snippets must be an array of strings"
  }),
  replies: z.array(z.string(), {
    required_error: "Replies is required",
    invalid_type_error: "Replies must be an array of strings"
  })
});

export const signUpSchema = z
  .object({
    body: z.object({
      username,
      fullName,
      email,
      password,
      confirmPassword: z.string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string"
      }),
      avatar,
      bio
    })
  })
  .refine(
    (data) => {
      return data.body.password === data.body.confirmPassword;
    },
    {
      message: "Confirm password must match password",
      path: ["confirmPassword"]
    }
  )
  .refine(
    async (data) => {
      const { email } = data.body;

      const exists = await UserModel.exists({ email });

      return !exists;
    },
    {
      message: "Email already exists",
      path: ["email"]
    }
  )
  .refine(
    async (data) => {
      const { username } = data.body;

      const exists = await UserModel.exists({ username });

      return !exists;
    },
    {
      message: "Username already exists",
      path: ["username"]
    }
  );

export const signInSchema = z.object({
  body: z.object({
    email,
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
  })
});

export type SignUpInput = z.TypeOf<typeof signUpSchema>;
