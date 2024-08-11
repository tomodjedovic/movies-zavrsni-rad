import { Schema } from "express-validator";
import User from "../models/user.model";

const signUpValidation: Schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "name must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "name must be between 3 and 255 caracters",
    },
    custom: {
      options: async (name) => {
        if (await User.doesNameExists(name)) {
          throw new Error("name already exists");
        }
        return true;
      },
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be a valid email",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "password must be a Text",
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 1,
      },
      errorMessage:
        "password must have min.8 characters,min.1 number and min.1 uppercase",
    },
  },
};

export default signUpValidation;
