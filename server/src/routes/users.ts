import { UserController } from "@controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);

userRouter.post("/", UserController.create);

userRouter.get("/user/:id", UserController.getById);

userRouter.patch("/user/:id", UserController.update);

export default userRouter;
