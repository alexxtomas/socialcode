/* eslint-disable camelcase */
import { passwordRegex } from "@utils/regex";
import z from "zod";

const userSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string"
    })
    .min(3, { message: "Username cannot be less than 3 characters" })
    .max(255, { message: "Username must be less than 255 characters" }),
  fullName: z
    .string({
      required_error: "Fullname is required",
      invalid_type_error: "Fullname must be a string"
    })
    .min(3, { message: "Fullname cannot be less than 3 characters" })
    .max(255, { message: "Fullname must be less than 255 characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .email({ message: "Email is invalid" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .regex(passwordRegex, {
      message:
        "Password is must be eight characters or longer, must contain at least 1 lowercase, 1 uppercase, 1 numeric character, and 1 special character."
    }),
  avatar: z
    .string({
      required_error: "Avatar is required",
      invalid_type_error: "Avatar must be a string"
    })
    .url({ message: "Avatar is invalid" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .min(3, { message: "Description cannot be less than 3 characters" })
    .max(500, { message: "Description must be less than 500 characters" })
});

export function validateUser(input: unknown) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: unknown) {
  return userSchema.partial().safeParse(input);
}
