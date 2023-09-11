import { connect } from "mongoose";
import { config } from "@config/index";
import { logger } from "./logger";

export async function dbConnect() {
  if (!config.dbUri) {
    throw new Error("DB_URI is not defined");
  }
  try {
    await connect(config.dbUri);
    logger.info("Connected to DB");
  } catch (connectError) {
    logger.error(connectError);
    process.exit(1);
  }
}
