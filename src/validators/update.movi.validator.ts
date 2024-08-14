import { Schema } from "express-validator";
import Movie from "../models/movie.model";

const updateMovieValidation: Schema = {
  title: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "title must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "title must be between3 and 255 caracters",
    },
    custom: {
      options: async (title) => {
        if (await Movie.doesMovieExists(title)) {
          throw new Error("Movie already exists");
        }
        return true;
      },
    },
  },
  release_date: {
    in: ["body"],
    optional: true,
    isDate: {
      errorMessage: " release_date must be in format yyyy-mm-dd",
    },
  },

  user_score: {
    in: ["body"],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "user score must be a number and min value is 0",
    },
  },

  description: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "description must be a text",
    },
    isLength: {
      options: { min: 3, max: 2000 },
      errorMessage: "description length must be between 3 and 2000 caracters",
    },
  },

  image: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "i...",
    },
  },

  trailer: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "t...",
    },
  },

  director: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "director must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
    },
  },

  duration: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "duration must be a string",
    },
    isLength: {
      options: { min: 2, max: 255 },
    },
  },
};

export default updateMovieValidation;
