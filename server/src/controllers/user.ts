import { UserModel } from "@models/User";
import { logger } from "@utils/logger";
import { Request, Response } from "express";
import { SignUpInput } from "@schemas/user";
import { SessionService } from "@services/session";
import { signJwt } from "@utils/jwt";
import { config } from "@config/index";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      if (users.length === 0) {
        return res.status(204).json({ message: "No users found" });
      }
      res.json(users);
    } catch (findError) {
      logger.error(findError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (findByIdError) {
      logger.error(findByIdError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async signUp(req: Request<object, object, SignUpInput["body"]>, res: Response) {
    try {
      const user = await UserModel.create(req.body);
      res.json(user);
    } catch (createUserError) {
      logger.error(createUserError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      const isMatch = await user?.comparePassword(password);

      if (!user || !isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const session = await SessionService.create({
        userId: user._id,
        userAgent: req.headers["user-agent"] ?? ""
      });

      const payload = { ...user.toJSON(), session: session.id };

      const accessToken = signJwt({
        payload,
        options: { expiresIn: config.jwt.accessTokenTimeToLive }
      });

      const refreshToken = signJwt({
        payload,
        options: { expiresIn: config.jwt.refreshTokenTimeToLive }
      });

      res.json({ accessToken, refreshToken });
    } catch (signInError) {
      logger.error(signInError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async logout(req: Request, res: Response) {
    const sesstionId = res.locals.user.session;

    await SessionService.update({
      query: { _id: sesstionId },
      update: { valid: false }
    });
    return res.send({
      accessToken: null,
      refreshToken: null
    });
  }

  static async getLoggedIn(req: Request, res: Response) {
    const userId = res.locals.user.id;

    try {
      const sessions = await SessionService.find({
        query: { user: userId, valid: true }
      });
      return res.json(sessions);
    } catch (findSessionError) {
      logger.error(findSessionError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.findByIdAndUpdate(id, {
        name,
        email,
        password
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (findByIdAndUpdateError) {
      logger.error(findByIdAndUpdateError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
