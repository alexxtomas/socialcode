import { SessionService } from "@services/session";
import { verifyJwt } from "@utils/jwt";
import { logger } from "@utils/logger";
import { NextFunction, Request, Response } from "express";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"];

  try {
    const { decoded, expired } = verifyJwt({ token: accessToken ?? "" });
    if (decoded) {
      res.locals.user = decoded;
    }
    if (expired && refreshToken && typeof refreshToken === "string") {
      try {
        const newAccessToken = await SessionService.reIssueAccessToken({ refreshToken });
        res.setHeader("x-access-token", newAccessToken!);
        const result = verifyJwt({ token: newAccessToken ?? "" });

        res.locals.user = result.decoded;
      } catch (reIssueAccessTokenError) {
        logger.error(reIssueAccessTokenError);
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
    next();
  } catch (verifyJwtError) {
    logger.error(verifyJwtError);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
