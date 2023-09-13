/* eslint-disable camelcase */
import { AVAILABLE_LANGUAGES } from "@utils/constants";
import z from "zod";

const payload = {
  body: z.object({
    content: z
      .string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string"
      })
      .min(3, { message: "Content cannot be less than 3 characters" })
      .max(500, { message: "Content must be less than 500 characters" }),
    language: z.enum(AVAILABLE_LANGUAGES, {
      invalid_type_error: `Language must be ${AVAILABLE_LANGUAGES.join(", ")}`,
      required_error: "Language is required"
    }),
    snippet: z
      .string({
        required_error: "Snippet is required",
        invalid_type_error: "Snippet must be a string"
      })
      .min(3, { message: "Snippet cannot be less than 3 characters" }),
    likes: z.array(z.string(), {
      required_error: "Likes is required",
      invalid_type_error: "Likes must be an array of strings"
    })
  })
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string"
    })
  })
};

export const createSnippetSchema = z.object({
  body: payload.body.omit({ likes: true })
});

export const updateSnippetSchema = z.object({
  body: payload.body.partial(),
  ...params
});

export const deleteSnippetSchema = z.object({
  ...params
});

export const getSnippetByIdSchema = z.object({
  ...params
});

export type createSnippetInput = z.infer<typeof createSnippetSchema>;
export type updateSnippetInput = z.infer<typeof updateSnippetSchema>;
export type deleteSnippetInput = z.infer<typeof deleteSnippetSchema>;
export type getSnippetByIdInput = z.infer<typeof getSnippetByIdSchema>;
