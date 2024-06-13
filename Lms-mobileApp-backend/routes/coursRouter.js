import { Router } from "express";
import { isAdminLogin, isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { singleUpload } from "../middleware/multer.js";
import {
  addChapter,
  addQuize,
  courseOnboarding,
  createReview,
  deleteChapter,
  deleteTags,
  editChapter,
  editCourse,
  getAllCourse,
  getChapter,
  getCourse,
  getFreeCourses,
  getTopCourses,
  publisedCourse,
  publisedOrUnpublished,
  reOrderChapter,
  deleteCourse,
  removeQuize,
  getAllCourseForAdmin,
  getCourseForAdmin,
} from "../controllers/courseController.js";

const courseRouter = Router();

// ========================= Admin Routes ======================
courseRouter.post(
  "/onboarding",
  isAdminLogin,
  isAdmin,
  singleUpload,
  courseOnboarding
);
// courseRouter.post("/create", isAdminLogin, isAdmin, singleUpload, createCourse);
courseRouter.get(
  "/getCourse/admin/:id",
  isAdminLogin,
  isAdmin,
  getCourseForAdmin
);

courseRouter.post("/add-chapter/:id", isAdminLogin, isAdmin, addChapter);
courseRouter.put("/publish-course/:id", isAdminLogin, isAdmin, publisedCourse);
courseRouter.get(
  "/getAll-courses/admin",
  isAdminLogin,
  isAdmin,
  getAllCourseForAdmin
);
courseRouter.put(
  "/edit-course/:id",
  isAdminLogin,
  isAdmin,
  singleUpload,
  editCourse
);

courseRouter.put("/delete-tags/:id", isAdminLogin, isAdmin, deleteTags);

courseRouter.put("/reorder/:id", isAdminLogin, isAdmin, reOrderChapter);
courseRouter.get("/getChapter/:id/chapter", isAdminLogin, isAdmin, getChapter);
courseRouter.put(
  "/edit-chapter/:id/chapter",
  isAdminLogin,
  isAdmin,
  singleUpload,
  editChapter
);
courseRouter.put(
  "/delete-chapter/:id/chapter",
  isAdminLogin,
  isAdmin,
  deleteChapter
);
courseRouter.put(
  "/publish-chapter/:id/chapter",
  isAdminLogin,
  isAdmin,
  publisedOrUnpublished
);
courseRouter.put("/add-quiz/:id/chapter", isAdminLogin, isAdmin, addQuize);
courseRouter.put(
  "/remove-quiz/:id/chapter",
  isAdminLogin,
  isAdmin,
  removeQuize
);
courseRouter.delete("/delete-course/:id", isAdminLogin, isAdmin, deleteCourse);
// ========================= User Routes =====================
courseRouter.put("/add-review/:id", isLogin, createReview);

courseRouter.get("/getCourse/:id", getCourse);

courseRouter.get("/getAll-courses", getAllCourse);

courseRouter.get("/getTop-courses", getTopCourses);

courseRouter.get("/get-Free-courses", getFreeCourses);

export default courseRouter;
