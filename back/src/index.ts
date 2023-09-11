import { corsMiddleware } from "@middlewares/cors";
import express from "express";

const PORT = process.env || 1234;
const app = express();

app.use(express.json());
app.use(corsMiddleware({}));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});

("mongodb+srv://alex:q6vSaNRoGESl4Tt9@cluster0.dojtbik.mongodb.net/?retryWrites=true&w=majority");
