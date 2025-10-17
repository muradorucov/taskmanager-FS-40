const express = require("express");
const { login, logout, currentUser, forgotPassword, resetPassword, resendVerifyEmail, tokenVerify, verifyAccount } = require("../controllers/auth.controller");
const validate = require("../middleware/validation");
const loginSchema = require("../validations/login.schema");
const authenticate = require("../middleware/authenticate");
const forgotSchema = require("../validations/forgotpass.schema");
const resetSchema = require("../validations/resetpass.schema");
const limiterMiddle = require("../middleware/limitter");
const { loggerMiddleware } = require("../utils/logger");
const checkRole = require("../middleware/authorisation");

const authRouter = express.Router();


authRouter.post("/login", loggerMiddleware, validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/current-user", authenticate, currentUser);
authRouter.post("/forgot-pass", validate(forgotSchema), forgotPassword);
authRouter.post("/reset-pass", validate(resetSchema), resetPassword);
authRouter.get("/token-verify", tokenVerify);
authRouter.post("/account-verify", verifyAccount);
authRouter.post("/resend-verify-email", authenticate, checkRole, resendVerifyEmail);



module.exports = authRouter