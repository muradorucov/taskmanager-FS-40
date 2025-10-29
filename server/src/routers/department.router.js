const express = require("express");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/authorisation");
const validate = require("../middleware/validation");
const departmentSchema = require("../validations/department.schema");
const {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  editDepartment,
  changeStatus,
  deleteDepartment,
  getActiveDepartments
} = require("../controllers/department.controller");

const departmentRouter = express.Router();


departmentRouter.post(
  "/create",
  authenticate,
  checkRole,
  validate(departmentSchema),
  createDepartment
);

departmentRouter.get(
  "/",
  authenticate,
  checkRole,
  getAllDepartments
);
departmentRouter.get(
  "/active",
  authenticate,
  checkRole,
  getActiveDepartments
);

departmentRouter.get(
  "/:id",
  authenticate,
  checkRole,
  getSingleDepartment
);


departmentRouter.put(
  "/:id",
  authenticate,
  checkRole,
  validate(departmentSchema),
  editDepartment
);
departmentRouter.patch(
  "/:id",
  authenticate,
  checkRole,
  changeStatus
);
departmentRouter.delete(
  "/:id",
  authenticate,
  checkRole,
  deleteDepartment
);


module.exports = departmentRouter