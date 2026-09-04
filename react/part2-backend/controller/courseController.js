import Course from "../models/CourseModel.js";

export default class CourseController {
  async findAllCourse(req, res) {
    try {
      const courses = await Course.find(
        {},
        {
          description: 0,
        },
      );

      return res.status(200).json({
        status: true,
        data: courses,
      });
    } catch (e) {
      throw e;
    }
  }

  async findCourseById(req, res) {
    try {
      const { ids } = req.params;

      const courses = await Course.find(
        {
          _id: {
            $in: ids.split(","),
          },
        },
        {
          description: 0,
        },
      );

      return res.status(200).json({
        status: true,
        data: courses,
      });
    } catch (e) {
      throw e;
    }
  }
}
