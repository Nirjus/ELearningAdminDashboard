import { Router } from "express";
import {
  chapterCompleteController,
  checkChapterCompleted,
  checkCourseComplete,
  checkEnroll,
  createEnrollMent,
  getEnrollCourses,
  getTotalAnalytics,
} from "../controllers/enrollController.js";
import { isAdminLogin, isLogin } from "../middleware/isLogin.js";

const enrollRouter = Router();

enrollRouter.post("/create", isLogin, createEnrollMent);

enrollRouter.get("/check-enroll", isLogin, checkEnroll);

enrollRouter.put("/chapter-complete", isLogin, chapterCompleteController);

enrollRouter.get("/check-complete", isLogin, checkChapterCompleted);

// enrollRouter.get("/getAll-enroll-course", isLogin, getEnrollCourses);

enrollRouter.get("/check-courseComplete", isLogin, checkCourseComplete);

//========================  Admin Route  =================================

enrollRouter.get("/enroll-analytic/:userId", isAdminLogin, getEnrollCourses);

enrollRouter.get("/total-analytic", isAdminLogin, getTotalAnalytics);
export default enrollRouter;
