import jwt from "jsonwebtoken";
import ms, { StringValue } from "ms";

const SECRET: string = process.env.JWT_SECRET || "default_secret_key";


export function signJwt(payload: object, expiresIn: StringValue): string {
  return jwt.sign(payload, SECRET, { expiresIn: ms(expiresIn) });
}

export function verifyJwt(token: string): object | string | null {
  try {
    return jwt.verify(token, SECRET) as object;
  } catch {
    return null;
  }
}
