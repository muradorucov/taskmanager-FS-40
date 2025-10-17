const express = require("express");
const { createUser, getAllUsers, getSingleUser, editUser, changeStatus, deleteUser } = require("../controllers/user.controller");
const validate = require("../middleware/validation");
const userSchema = require("../validations/user.schema");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/authorisation");

const userRouter = express.Router();


userRouter.post(
  "/create",
  authenticate,
  checkRole,
  validate(userSchema),
  createUser
);
userRouter.get(
  "/",
  authenticate,
  checkRole,
  getAllUsers
);

userRouter.get(
  "/:id",
  authenticate,
  checkRole,
  getSingleUser
);

userRouter.put(
  "/:id",
  authenticate,
  checkRole,
  validate(userSchema),
  editUser
);
userRouter.patch(
  "/:id",
  authenticate,
  checkRole,
  changeStatus
);
userRouter.delete(
  "/:id",
  authenticate,
  checkRole,
  deleteUser
);


module.exports = userRouter