import { Router } from "express";

import { singleUpload } from "../middleware/multer.js";
import { isAdminLogin, isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getAllCategoryForAdmin,
  getSingleCategory,
  publishCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.get("/getAll-category", getAllCategory);

// =================== Admin route =========================
categoryRoutes.get(
  "/getAll-category/admin",
  isAdminLogin,
  isAdmin,
  getAllCategoryForAdmin
);
categoryRoutes.post("/create", isAdminLogin, isAdmin, createCategory);
categoryRoutes.get(
  "/getCategory/:id",
  isAdminLogin,
  isAdmin,
  getSingleCategory
);

categoryRoutes.put(
  "/update/:id",
  isAdminLogin,
  isAdmin,
  singleUpload,
  updateCategory
);

categoryRoutes.put(
  "/publish-category/:id",
  isAdminLogin,
  isAdmin,
  publishCategory
);
categoryRoutes.delete("/delete/:id", isAdminLogin, isAdmin, deleteCategory);

export default categoryRoutes;
