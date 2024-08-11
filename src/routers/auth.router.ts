import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { checkSchema } from "express-validator";
import signUpValidation from "../validators/signUp.validator";
import validationMiddleware from "../middlewares/validation.middleware";
import signInValidation from "../validators/signIn.validator";

const authRouter = Router();

authRouter.post(
  "/signup",
  checkSchema(signUpValidation),
  validationMiddleware,
  signUp
);

authRouter.post(
  "/signin",
  checkSchema(signInValidation),
  validationMiddleware,
  signIn
);
export default authRouter;
