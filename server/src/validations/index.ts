import z from "zod";

interface Params {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodObject<any, any>;
  input: unknown;
}
export function validateSchema({ schema, input }: Params) {
  return schema.safeParse(input);
}
export function validatePartialSchemaT({ schema, input }: Params) {
  return schema.partial().safeParse(input);
}
