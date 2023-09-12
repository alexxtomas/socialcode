/* eslint-disable camelcase */
import z from "zod";

export const replySchema = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string"
  }),
  user: z.string({
    required_error: "User is required",
    invalid_type_error: "User must be a string"
  }),
  snippet: z.string({
    required_error: "Snippet is required",
    invalid_type_error: "Snippet must be a string"
  }),
  likes: z
    .number({
      required_error: "Likes is required",
      invalid_type_error: "Likes must be a number"
    })
    .int({
      message: "Likes must be an integer"
    }),
  replies: z.array(z.string(), {
    required_error: "Replies is required",
    invalid_type_error: "Replies must be an array of strings"
  })
});
