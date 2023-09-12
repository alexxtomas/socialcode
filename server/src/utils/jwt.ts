import jwt from "jsonwebtoken";
import { config } from "@config/index";
import { logger } from "./logger";

const { jwt: jwtConfig } = config;

export function signJwt({ payload, options }: { payload: object; options?: jwt.SignOptions }) {
  if (!jwtConfig.privateKey) {
    logger.error("JWT private key is not defined");
    return;
  }

  return jwt.sign(payload, jwtConfig.privateKey, {
    ...(options && options),
    algorithm: "RS256"
  });
}

export function verifyJwt({ token }: { token: string }) {
  if (!jwtConfig.publickKey) {
    throw new Error("JWT public key is not defined");
  }
  try {
    const decoded = jwt.verify(token, jwtConfig.publickKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (jwtVerifyError) {
    const _jwtVerifyError = jwtVerifyError as jwt.VerifyErrors;
    return {
      valid: false,
      expired: _jwtVerifyError.message === "jwt expired",
      decoded: null
    };
  }
}
