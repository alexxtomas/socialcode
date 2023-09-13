import { UserController } from "@controllers/user";
import { requireUser } from "@middlewares/require-user";
import { validateResource } from "@middlewares/validate-resource";
import { signInSchema, signUpSchema } from "@schemas/user";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAll);

userRouter.post("/sign-up", validateResource({ schema: signUpSchema }), UserController.signUp);

userRouter.post("/sign-in", validateResource({ schema: signInSchema }), UserController.signIn);

userRouter.get("/logout", requireUser, UserController.logout);

userRouter.get("/logged-in", requireUser, UserController.getLoggedIn);

userRouter.get("/:id", UserController.getById);

userRouter.patch("/:id", UserController.update);

export default userRouter;
