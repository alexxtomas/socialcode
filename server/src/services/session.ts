import { config } from "@config/index";
import { SessionDocument, SessionModel } from "@models/Session";
import { signJwt, verifyJwt } from "@utils/jwt";
import { FilterQuery, UpdateQuery } from "mongoose";
import { UserService } from "./user";

export class SessionService {
  static async create({ userId, userAgent }: { userId: string; userAgent: string }) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  }

  static async find({ query }: { query: FilterQuery<SessionDocument> }) {
    return SessionModel.find(query);
  }

  static async update({
    query,
    update
  }: {
    query: FilterQuery<SessionDocument>;
    update: UpdateQuery<SessionDocument>;
  }) {
    return SessionModel.updateOne(query, update);
  }

  static async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt({ token: refreshToken });
    const _decoded = decoded as { session?: string } | undefined;
    if (!_decoded || !(_decoded as { session?: string })?.session) {
      throw new Error("Cannot verify refresh token");
    }

    const session = await SessionModel.findById(_decoded.session);

    if (!session || !session.valid) {
      throw new Error("No session or session is invalid ");
    }

    const user = await UserService.find({ query: { _id: session.user } });
    if (!user) {
      throw new Error("No user found ");
    }
    const payload = { ...user.toJSON(), session: session._id };
    const accessToken = signJwt({
      payload,
      options: { expiresIn: config.jwt.accessTokenTimeToLive }
    });
    return accessToken;
  }
}
