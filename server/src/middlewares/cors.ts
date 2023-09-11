import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:5173"];

export const corsMiddleware = ({
  acceptedOrigins = ACCEPTED_ORIGINS
}: {
  acceptedOrigins?: string[];
}) => {
  return cors({
    origin: (origin, originCallback) => {
      if (!origin) {
        return originCallback(null, true);
      }
      if (acceptedOrigins.includes(origin)) {
        return originCallback(null, true);
      }

      return originCallback(new Error("Not allowed by CORS"));
    }
  });
};
