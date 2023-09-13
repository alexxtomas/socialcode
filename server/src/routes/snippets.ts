import { SnippetController } from "@controllers/snippet";
import { requireUser } from "@middlewares/require-user";
import { validateResource } from "@middlewares/validate-resource";
import { createSnippetSchema, getSnippetByIdSchema, updateSnippetSchema } from "@schemas/snippet";
import { Router } from "express";

const snippetsRouter = Router();

snippetsRouter.get("/", requireUser, SnippetController.getAll);

snippetsRouter.post(
  "/",
  [requireUser, validateResource({ schema: createSnippetSchema })],
  SnippetController.create
);

snippetsRouter.get(
  "/:id",
  [requireUser, validateResource({ schema: getSnippetByIdSchema })],
  SnippetController.getById
);

snippetsRouter.patch(
  "/:id",
  [requireUser, validateResource({ schema: updateSnippetSchema })],
  SnippetController.update
);

snippetsRouter.delete("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

export default snippetsRouter;
