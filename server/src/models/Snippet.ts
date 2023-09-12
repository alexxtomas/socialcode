import { AVAILABLE_LANGUAGES } from "@utils/constants";
import { Schema, InferSchemaType, model } from "mongoose";

const SnippetSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
    language: { type: String, required: true, enum: AVAILABLE_LANGUAGES },
    snippet: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

type Snippet = InferSchemaType<typeof SnippetSchema>;

SnippetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  }
});

const SnippetModel = model("Snippet", SnippetSchema);

export { Snippet, SnippetModel };
