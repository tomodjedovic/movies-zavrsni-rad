import { Schema } from "express-validator";
import Movie from "../models/movie.model";

const createMovieValidation: Schema = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "title is required",
    },
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
    exists: {
      errorMessage: " release date is required",
    },
    isDate: {
      errorMessage: " release_date must be in format yyyy-mm-dd",
    },
  },

  user_score: {
    in: ["body"],
    exists: {
      errorMessage: " user score is required",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "user score must be a number and min value is 0",
    },
  },

  description: {
    in: ["body"],
    exists: {
      errorMessage: " description is required",
    },
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
    exists: {
      errorMessage: " image is required",
    },
    isString: {
      errorMessage: "i...",
    },
  },

  trailer: {
    in: ["body"],
    exists: {
      errorMessage: " trailer is required",
    },
    isString: {
      errorMessage: "t...",
    },
  },

  director: {
    in: ["body"],
    exists: {
      errorMessage: "director is required",
    },
    isString: {
      errorMessage: "director must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
    },
  },

  duration: {
    in: ["body"],
    exists: {
      errorMessage: " duration is required",
    },
    isString: {
      errorMessage: "duration must be a string",
    },
    isLength: {
      options: { min: 2, max: 255 },
    },
  },
};

export default createMovieValidation;
