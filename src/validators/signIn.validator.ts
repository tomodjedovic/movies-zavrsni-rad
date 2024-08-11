import { Schema } from "express-validator";

const signInValidation: Schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "username must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "username must be between 3 and 255 caracters",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "password must be text",
    },
  },
};

export default signInValidation;
