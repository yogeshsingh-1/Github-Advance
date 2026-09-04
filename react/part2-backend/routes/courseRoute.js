import { Router } from "express";
import CourseController from "../controller/courseController.js";
const courseRouter = Router();
const courseController = new CourseController();
// find all course
courseRouter.get("/courses", courseController.findAllCourse);
courseRouter.get("/course/:ids", courseController.findCourseById);
// find id based course
// courseRouter.get("/");
export default courseRouter;
