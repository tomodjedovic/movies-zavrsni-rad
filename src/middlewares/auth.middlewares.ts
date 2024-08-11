import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TypeUser } from "../types/user.types";
import { AuthRequest } from "../types/express.types";

export function getTokenKey() {
  return process.env.TOKEN_SICRET_KEY || "token";
}

export default function isAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    if (!payload) return res.status(401).json({ message: "Unauthorized" });
    req.user = payload as TypeUser;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
