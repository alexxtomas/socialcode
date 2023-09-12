import { Schema, InferSchemaType, model, Document } from "mongoose";

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

type Session = Omit<InferSchemaType<typeof SessionSchema>, "createdAt" | "updatedAt">;

type SessionDocument = InferSchemaType<typeof SessionSchema> & Document;

SessionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  }
});

const SessionModel = model<SessionDocument>("Session", SessionSchema);

export { Session, SessionModel, SessionDocument };
