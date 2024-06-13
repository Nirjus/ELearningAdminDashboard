import { Router } from "express";
import { isAdminLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createSubscription,
  getAllSubscription,
  removeBenifits,
  removeSubscription,
  updateSubscription,
} from "../controllers/subscriptionController.js";

export const subscriptionRouter = Router();
// =========================== Admin Route ============================
subscriptionRouter.post("/create", isAdminLogin, isAdmin, createSubscription);

subscriptionRouter.put(
  "/update/:id",
  isAdminLogin,
  isAdmin,
  updateSubscription
);

subscriptionRouter.delete(
  "/remove/:id",
  isAdminLogin,
  isAdmin,
  removeSubscription
);

subscriptionRouter.put(
  "/remove-benifit/:id",
  isAdminLogin,
  isAdmin,
  removeBenifits
);
// ============================ Common Route ======================
subscriptionRouter.get("/getAll-subscription", getAllSubscription);
