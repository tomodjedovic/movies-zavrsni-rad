import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreBuId,
  updateGenre,
} from "../controllers/genre.controller";
import { checkSchema } from "express-validator";
import createGenreValidator from "../validators/create.genre.validator";
import validationMiddleware from "../middlewares/validation.middleware";
import isAuth from "../middlewares/auth.middlewares";
import updateGenreValidation from "../validators/update.genre.validator";

const genreRouter = Router();

genreRouter.post(
  "/",
  isAuth,
  checkSchema(createGenreValidator),
  validationMiddleware,
  createGenre
);

genreRouter.get("/", getAllGenres);

genreRouter.get("/:id", getGenreBuId);

genreRouter.delete("/:id", deleteGenre);

genreRouter.put(
  "/:id",
  checkSchema(updateGenreValidation),
  validationMiddleware,
  updateGenre
);

export default genreRouter;
