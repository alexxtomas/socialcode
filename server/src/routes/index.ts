import { Express } from "express";
import userRouter from "./users";
import { config } from "@config/index";
import snippetsRouter from "./snippets";

const { v1BaseUri } = config;

export function routes(app: Express) {
  app.use(`${v1BaseUri}/users`, userRouter);
  app.use(`${v1BaseUri}/snippets`, snippetsRouter);
}
