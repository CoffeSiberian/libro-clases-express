import { Express } from "express";
import {
	checkDirector,
	checkTeacher,
	checkInspector,
	dbCheck,
	checkValidate,
} from "../middlewares/appMiddleware";

// POST
import addEmployee from "./addEmployee";
import addGrade from "./addGrade";
import addLessons from "./addLessons";
import addObservations from "./addObservations";
import addQualification from "./addQualification";
import addSchedule from "./addSchedule";
import addStudent from "./addStudent";
import login from "./login";
import config from "./config";

// DELETE
import delGrade from "./delGrade";

// PUT
import editObjective from "./editObjective";
("./editObjective");

// GET
import getGradeLessons from "./getGradeLessons";
import getStudent from "./getStudent";
import getObservations from "./getObservations";
import getAllQualification from "./getAllQualification";
import getLessonQualification from "./getLessonQualification";
import getAllEmployee from "./getAllEmployee";
import getAllLessons from "./getAllLessons";
import getAllGrades from "./getAllGrades";
import getLessonSchedule from "./getLessonSchedule";
import getTeacherGrades from "./getTeacherGrades";
import getTeacherLessons from "./getTeacherLessons";

export default function (app: Express) {
	// app middlewares
	app.use(dbCheck);
	//////////////////

	app.post("/addlessons", checkDirector, addLessons);
	app.post("/addemployee", checkDirector, addEmployee);
	app.post("/addgrade", checkDirector, addGrade);
	app.post("/addobservations", checkTeacher, addObservations);
	app.post("/addqualification", checkTeacher, addQualification);
	app.post("/addstudent", checkDirector, addStudent);
	app.post("/addschedule", checkDirector, addSchedule);

	app.post("/login", login);
	app.post("/validate", checkValidate);

	app.post("/config", config);

	app.delete("/delgrade", checkDirector, delGrade);

	app.put("/editobjective", checkTeacher, editObjective);

	app.get("/getallemployee", checkDirector, getAllEmployee);
	app.get("/getalllessons", checkDirector, getAllLessons);
	app.get("/getallgrades", checkDirector, getAllGrades);
	app.get("/getlessonschedule/:id", checkTeacher, getLessonSchedule);
	app.get("/getgradelessons/:id", checkDirector, getGradeLessons);
	app.get("/getstudent/:gradeId", checkTeacher, getStudent);
	app.get("/getobservations/:rut", checkTeacher, getObservations);
	app.get("/getallqualification/:rut", checkTeacher, getAllQualification);
	app.get("/getteachergrades/:rut", checkTeacher, getTeacherGrades);
	app.get("/getteacherlessons/:rut", checkTeacher, getTeacherLessons);
	app.get(
		"/getqualification/:rut/:lessonId",
		checkTeacher,
		getLessonQualification
	);
}
