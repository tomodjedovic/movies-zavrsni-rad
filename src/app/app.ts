import express from "express";
import authRouter from "../routers/auth.router";
import genreRouter from "../routers/genre.router";
import movieRouter from "../routers/movie.router";

export default function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/genres", genreRouter);
  app.use("/api/movies", movieRouter);

  return app;
}
