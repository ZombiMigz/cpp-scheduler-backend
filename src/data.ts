import { app, prismaClient } from "./index";
import express, { Router } from "express";
export async function initData() {
  let dataRouter = express.Router({ mergeParams: true });
  app.use("/data", dataRouter);
  await initSectionData(dataRouter);
  await initCourseData(dataRouter);
  await initInstructorData(dataRouter);
}
export async function initSectionData(dataRouter: Router) {
  let router = express.Router({ mergeParams: true });
  dataRouter.use("/sections", router);

  router.post("/find", async (req, res, next) => {
    // console.log("find called");
    let where = req.body;
    try {
      let sections = await prismaClient.sections.findMany({
        where,
      });
      res.status(200).send(JSON.stringify(sections));
    } catch (e) {
      next(e);
    }
  });

  router.post("/findFirst", async (req, res, next) => {
    let where = req.body;
    try {
      let section = await prismaClient.sections.findFirst({ where });
      res.status(200).send(JSON.stringify(section));
    } catch (e) {
      next(e);
    }
  });

  router.post("/count", async (req, res, next) => {
    let where = req.body;
    try {
      let count = await prismaClient.sections.count({ where });
      res.status(200).send(JSON.stringify(count));
    } catch (e) {
      next(e);
    }
  });
}

export async function initCourseData(dataRouter: Router) {
  let router = express.Router({ mergeParams: true });
  dataRouter.use("/courses", router);

  // get course list
  let courseList = await prismaClient.courses.findMany();

  router.post("/find", async (req, res, next) => {
    let where = req.body;
    try {
      let courses = await prismaClient.courses.findMany({ where });
      res.status(200).send(JSON.stringify(courses));
    } catch (e) {
      next(e);
    }
  });

  router.post("/findFirst", async (req, res, next) => {
    let where = req.body;
    try {
      let course = await prismaClient.courses.findFirst({ where });
      res.status(200).send(JSON.stringify(course));
    } catch (e) {
      next(e);
    }
  });

  router.post("/count", async (req, res, next) => {
    res.status(200).send(JSON.stringify(courseList.length));
  });
}

export async function initInstructorData(dataRouter: Router) {
  let router = express.Router({ mergeParams: true });
  dataRouter.use("/instructors", router);

  // get instructorlist list
  let instructorList = await prismaClient.instructors.findMany();

  router.post("/find", async (req, res, next) => {
    let where = req.body;
    try {
      let instructors = await prismaClient.instructors.findMany({ where });
      res.status(200).send(JSON.stringify(instructors));
    } catch (e) {
      next(e);
    }
  });

  router.post("/findFirst", async (req, res, next) => {
    let where = req.body;
    try {
      let instructor = await prismaClient.instructors.findFirst({ where });
      res.status(200).send(JSON.stringify(instructor));
    } catch (e) {
      next(e);
    }
  });

  router.post("/count", async (req, res, next) => {
    res.status(200).send(JSON.stringify(instructorList.length));
  });
}
