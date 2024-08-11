import { Request, Response } from "express";
import User from "../models/user.model";
import { getTokenKey } from "../middlewares/auth.middlewares";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "Error while creating user,please try again" });

    console.log(`log iz signup: ${user}`);
    const token = sign(user.sanitize, getTokenKey(), { expiresIn: "1d" });
    return res.status(201).json({ ...user.sanitize, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = sign(user.sanitize, getTokenKey(), { expiresIn: "1d" });
    res.status(200).json({ ...user.sanitize, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
