import { Schema, InferSchemaType, model } from "mongoose";

const ReplySchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    snippet: { type: Schema.Types.ObjectId, ref: "Snippet" },
    likes: { type: Number, default: 0 },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }]
  },
  {
    timestamps: true
  }
);

type Reply = InferSchemaType<typeof ReplySchema>;

ReplySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  }
});

const ReplyModel = model("Reply", ReplySchema);

export { Reply, ReplyModel };
