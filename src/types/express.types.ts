import { Request } from "express";
import { TypeUser } from "./user.types";

export type AuthRequest = Request & { user?: TypeUser };
