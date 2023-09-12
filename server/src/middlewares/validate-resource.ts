import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateResource(schema: ZodType<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) });
    }
    next();
  };
}
