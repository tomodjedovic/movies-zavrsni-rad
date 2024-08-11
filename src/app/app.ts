import express from "express";
import authRouter from "../routers/auth.router";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/api/users", authRouter);
  app.use("/api/users", authRouter);

  return app;
}
