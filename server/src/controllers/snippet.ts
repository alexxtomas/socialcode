import { SnippetModel } from "@models/Snippet";
import { createSnippetInput, getSnippetByIdInput, updateSnippetInput } from "@schemas/snippet";
import { UserService } from "@services/user";
import { logger } from "@utils/logger";
import { Request, Response } from "express";

export class SnippetController {
  static async getAll(req: Request, res: Response) {
    try {
      const snippets = await SnippetModel.find().populate("creator");

      if (snippets.length === 0) {
        return res.status(204).json({ message: "No snippets found" });
      }

      res.json(snippets);
    } catch (getAllError) {
      logger.error(getAllError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getById(req: Request<getSnippetByIdInput["params"], object, object>, res: Response) {
    const { id } = req.params;
    try {
      const snippet = await SnippetModel.findById(id);
      if (!snippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      res.json(snippet);
    } catch (getByIdError) {
      logger.error(getByIdError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req: Request<object, object, createSnippetInput["body"]>, res: Response) {
    const { content, language, snippet } = req.body;
    const userId = res.locals.user.id;

    try {
      const newSnippet = await SnippetModel.create({
        content,
        language,
        snippet,
        creator: userId
      });

      UserService.update({
        query: { _id: userId },
        update: { $push: { snippets: newSnippet._id } }
      });

      res.json(newSnippet);
    } catch (createSnippetError) {
      logger.error(createSnippetError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(
    req: Request<updateSnippetInput["params"], object, updateSnippetInput["body"]>,
    res: Response
  ) {
    const { id } = req.params;
    const result = res.locals.body;

    try {
      const updatedSnippet = await SnippetModel.findOneAndUpdate({ _id: id }, result, {
        new: true
      });
      res.json(updatedSnippet);
    } catch (updateSnippetError) {
      logger.error(updateSnippetError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
