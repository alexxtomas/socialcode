import "dotenv/config";
import { DB_URI, JWT_PRIVATE_KEY, JWT_PUBLIC_KEY, PORT } from "@utils/env";

export const config = {
  port: PORT ?? 1234,
  dbUri: DB_URI,
  saltRounds: 10,
  v1BaseUri: "/api/v1",
  jwt: {
    publickKey: JWT_PUBLIC_KEY,
    privateKey: JWT_PRIVATE_KEY,
    accessTokenTimeToLive: "15m",
    refreshTokenTimeToLive: "1h"
  }
};
