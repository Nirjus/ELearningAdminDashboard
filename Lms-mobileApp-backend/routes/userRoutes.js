import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  adminLogin,
  deleteUser,
  getAllUser,
  getUser,
  getUsersByPoint,
  logout,
  updatePassword,
  userLogin,
  userRegister,
  userUpdate,
  updateRole,
  processVerify,
  forgotPassword,
  verifyForgetPasswordEmail,
} from "../controllers/userController.js";
import { isAdminLogin, isLogin } from "../middleware/isLogin.js";
import { singleUpload } from "../middleware/multer.js";
import { isAdmin } from "../middleware/isAdmin.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const userRouter = Router();

userRouter.post("/register", limiter, userRegister);
userRouter.get("/verify/:token", limiter, processVerify);
userRouter.post("/login", limiter, userLogin);
userRouter.post("/admin-login", limiter, adminLogin);
userRouter.get("/logout", logout);

userRouter.get("/me", isAdminLogin, getUser);
userRouter.put("/update", isAdminLogin, singleUpload, userUpdate);
userRouter.put("/update-password", isAdminLogin, updatePassword);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/reset-password/:token", verifyForgetPasswordEmail);
userRouter.get("/getUsers/bypoint", isLogin, getUsersByPoint);

//  ========================= Admin Route =======================
userRouter.get("/getAllUser", isAdminLogin, isAdmin, getAllUser);
userRouter.delete("/delete-user/:id", isAdminLogin, isAdmin, deleteUser);
userRouter.put("/update-role/:id", isAdminLogin, isAdmin, updateRole);
export default userRouter;
