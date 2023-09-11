import pinoLogger from "pino";
import dayjs from "dayjs";

export const logger = pinoLogger({
  transport: {
    target: "pino-pretty"
  },
  base: {
    pid: false
  },
  timestamp: () => {
    return `,"time":"${dayjs().format()}"`;
  }
});
