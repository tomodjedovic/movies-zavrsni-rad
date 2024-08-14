import { Schema } from "express-validator";
import Genre from "../models/genre.model";

const updateGenreValidation: Schema = {
  name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "name must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "name must be between 3 and 255 caracters",
    },
    custom: {
      options: async (name) => {
        if (await Genre.doesGenreExists(name)) {
          throw new Error("Genre already exists");
        }
        return true;
      },
    },
  },
};

export default updateGenreValidation;
