import { User, UserModel } from "@models/User";
import { logger } from "@utils/logger";
import { Request, Response } from "express";
import { validateUser } from "@schemas/user";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
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

  static async signUp(req: Request, res: Response) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) });
    }

    const emailExists = await UserModel.exists({ email: req.body.email });
    const usernameExists = await UserModel.exists({ username: req.body.username });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser: User = {
      ...result.data
    };

    res.json(user);
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
