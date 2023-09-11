import { Router } from "express";

const snippetsRouter = Router();

snippetsRouter.get("/", (req, res) => {
  res.json("Hello World!");
});

snippetsRouter.post("/", (req, res) => {
  res.json({ id: req.params });
});

snippetsRouter.get("/snippet/:id", (req, res) => {
  res.json({ id: req.params.id });
});

snippetsRouter.patch("/snippet/:id", (req, res) => {
  res.json({ id: req.params.id });
});

snippetsRouter.delete("/snippet/:id", (req, res) => {
  res.json({ id: req.params.id });
});

export default snippetsRouter;
