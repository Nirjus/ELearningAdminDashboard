import { Router } from "express";
import { isAdminLogin, isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  checkMember,
  createMemberShip,
  getAllUsersWithMember,
  getMembershipDetails,
  userDetails,
} from "../controllers/memberController.js";

const memberRouter = Router();

memberRouter.get("/check-member", isLogin, checkMember);

memberRouter.post("/create", isLogin, createMemberShip);

memberRouter.get("/get-member", isLogin, getMembershipDetails);

// ======================= Admin Route ===========================

memberRouter.get(
  "/getAll-member",
  isAdminLogin,
  isAdmin,
  getAllUsersWithMember
);
memberRouter.get("/getMember/:id", isAdminLogin, isAdmin, userDetails);

export default memberRouter;
