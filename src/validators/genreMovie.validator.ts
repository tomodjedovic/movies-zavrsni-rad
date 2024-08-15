import { Schema } from "express-validator";
import GenreMovie from "../models/genre.movie.model";

const genreMovieValidation: Schema = {
  genreId: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "genreId must be a positive number",
    },
  },
};

export default genreMovieValidation;
