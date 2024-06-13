import EnrollMent from "../models/enrolledModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
export const createEnrollMent = async (req, res, next) => {
  try {
    const user = req.user;

    const { courseId, price, paymentMode, paymentId } = req.body;

    if (!courseId) {
      throw Error("Please Provide all information");
    }
    const checkEnrollment = await EnrollMent.findOne({
      userId: user.id,
    });
    const isEnrolled = checkEnrollment?.courseList?.find(
      (item) => item.courseId.toString() === courseId.toString()
    );
    if (isEnrolled) {
      throw Error("Course is Already Enrolled");
    }

    const paymentInfo = {
      price,
      paymentMode,
      paymentId,
    };
    if (checkEnrollment) {
      checkEnrollment.courseList.push({
        courseId: courseId,
        paymentInfo: paymentInfo,
      });

      await checkEnrollment.save();

      return res.status(201).json({
        success: true,
        message: "Course Enrolled Successfully",
        checkEnrollment,
      });
    }
    const enrollment = await EnrollMent.create({
      userId: user.id,
      userEmail: user.email,
    });
    enrollment.courseList.push({
      courseId: courseId,
      paymentInfo: paymentInfo,
    });
    await enrollment.save();
    return res.status(201).json({
      success: true,
      message: "Course Enrolled Successfully",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const checkEnroll = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId } = req.query;

    const isEnrolled = await EnrollMent.findOne({
      userId: user.id,
    });
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Course not enrolled",
      });
    }
    const isExists = isEnrolled?.courseList.some(
      (item) => item?.courseId?.toString() === courseId.toString()
    );

    if (isExists) {
      return res.status(201).json({
        success: true,
        message: "Course was already enrolled",
        enroll: isExists,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Course is not enrolled",
      enroll: isExists,
    });
  } catch (error) {
    next(error);
  }
};

export const chapterCompleteController = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId } = req.query;
    const { chapterID, chapterTitle } = req.body;

    const getCourse = await Course.findById(courseId);
    if (!getCourse) {
      throw Error("Course not found with this ID");
    }
    const isEnrolled = await EnrollMent.findOne({
      userId: user.id,
    });
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Course not enrolled",
      });
    }
    const course = isEnrolled.courseList.find(
      (item) => item?.courseId.toString() === courseId.toString()
    );
    if (!course) {
      throw Error("This Course is not enrolled");
    }
    const isComplete = course?.completedChapter?.some(
      (item) => item?.chapterID.toString() === chapterID?.toString()
    );
    if (isComplete) {
      throw Error("You already completed this chapter");
    }

    course.completedChapter.push({
      chapterID: chapterID,
      chapterTitle: chapterTitle,
    });

    const getUser = await User.findById(user?.id);
    if (course?.completedChapter?.length === getCourse?.chapter?.length) {
      if (getCourse?.courseLevel === "easy") {
        getUser.point += 50;
      } else if (getCourse?.courseLevel === "medium") {
        getUser.point += 100;
      } else {
        getUser.point += 150;
      }
    }

    await isEnrolled.save();
    await getUser.save();
    return res.status(201).json({
      success: true,
      message: "Chapter completed",
      chapterLength: course.completedChapter.length,
      user: getUser,
    });
  } catch (error) {
    next(error);
  }
};

export const checkChapterCompleted = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId, chapterID } = req.query;

    const isEnrolled = await EnrollMent.findOne({
      userId: user.id,
    });
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You not enrolled this course",
      });
    }
    const course = isEnrolled.courseList.find(
      (item) => item?.courseId.toString() === courseId.toString()
    );
    if (!course) {
      throw Error("This Course is not enrolled");
    }
    const isComplete = course?.completedChapter?.some(
      (item) => item?.chapterID?.toString() === chapterID.toString()
    );

    return res.status(201).json({
      success: true,
      isComplete,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollCourses = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const isEnrolled = await EnrollMent.findOne({
      userId: userId,
    });
    if (!isEnrolled) {
      throw Error("This user dont have any Enrolled Courses");
    }
    const courses = await Course.find({ isPublished: true });
    const enrolledCourse = [];

    courses.forEach((ch) =>
      isEnrolled.courseList.forEach((enr) => {
        if (enr.courseId.toString() === ch._id.toString()) {
          enrolledCourse.push({
            name: ch.name,
            total: enr.paymentInfo?.price,
          });
        }
      })
    );
    const totalRevenue = isEnrolled.courseList.reduce(
      (acc, curr) => acc + curr.paymentInfo?.price,
      0
    );
    const totalSales = isEnrolled.courseList?.length;
    const analytics = {
      enrolledCourse,
      totalRevenue,
      totalSales,
    };
    return res.status(201).json({
      success: true,
      analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const getTotalAnalytics = async (req, res, next) => {
  try {
    let totalRevenue = 0;
    let totalSales = 0;
    const enrollments = await EnrollMent.find({});

    const courses = await Course.find({ isPublished: true });
    // Initialize an object to hold revenue for each course
    const courseRevenueMap = new Map();

    // Iterate over all enrollments
    enrollments.forEach((enrollment) => {
      enrollment.courseList.forEach((courseItem) => {
        const price = courseItem.paymentInfo?.price || 0;

        // Increment total revenue and total sales
        totalRevenue += price;
        totalSales += 1;

        // Update revenue for the specific course
        const courseId = courseItem.courseId.toString();
        if (courseRevenueMap.has(courseId)) {
          courseRevenueMap.set(
            courseId,
            courseRevenueMap.get(courseId) + price
          );
        } else {
          courseRevenueMap.set(courseId, price);
        }
      });
    });

    // Prepare the list of enrolled courses with their total earnings
    const enrolledCourse = courses.map((course) => ({
      name: course.name,
      total: courseRevenueMap.get(course._id.toString()) || 0,
    }));

    const analytics = {
      enrolledCourse,
      totalRevenue,
      totalSales,
    };
    return res.status(201).json({
      success: true,
      analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const checkCourseComplete = async (req, res, next) => {
  try {
    const user = req.user;

    const isEnroll = await EnrollMent.findOne({
      userId: user?.id,
    });
    const allcourses = await Course.find({});
    if (!isEnroll) {
      throw Error("You dont have any enrolled course");
    }
    const completedCourses = [];
    // for(let i=0; i<allcourses.length; i++){}
    isEnroll?.courseList?.forEach((item) => {
      const course = allcourses?.find(
        (crs) => crs?._id?.toString() === item?.courseId?.toString()
      );
      if (course?.chapter?.length === item?.completedChapter?.length) {
        completedCourses.push(course);
      }
    });
    if (completedCourses.length === 0) {
      throw Error("You did not have any completed course");
    }

    return res.status(201).json({
      success: true,
      completedCourses,
    });
  } catch (error) {
    next(error);
  }
};
