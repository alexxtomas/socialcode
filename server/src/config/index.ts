import "dotenv/config";
import { DB_URI, PORT } from "@utils/env";

export const config = {
  port: PORT ?? 1234,
  dbUri: DB_URI,
  saltRounds: 10,
  v1BaseUri: "/api/v1"
};
