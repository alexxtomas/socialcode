import { corsMiddleware } from "@middlewares/cors";
import { config } from "./config";
import express from "express";
import { dbConnect } from "@utils/dbConnect";
import { logger } from "@utils/logger";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(corsMiddleware({}));
app.disable("x-powered-by");

app.listen(config.port, async () => {
  logger.info(`Server is running on http://localhost:${config.port}`);

  await dbConnect();

  routes(app);
});
