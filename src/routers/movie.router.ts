import { Router } from "express";
import { checkSchema } from "express-validator";
import createMovieValidation from "../validators/create.movie.validator";
import isAuth from "../middlewares/auth.middlewares";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie.controller";
import updateMovieValidation from "../validators/update.movi.validator";
import validationMiddleware from "../middlewares/validation.middleware";

const movieRouter = Router();

movieRouter.post(
  "/",
  // isAuth,
  checkSchema(createMovieValidation),
  validationMiddleware,
  createMovie
);

movieRouter.get("/", getMovies);

movieRouter.get("/:id", getMovie);

movieRouter.delete("/:id", deleteMovie);

movieRouter.put(
  "/:id",
  checkSchema(updateMovieValidation),
  validationMiddleware,
  updateMovie
);

export default movieRouter;
