import { Model, DataTypes, ForeignKey } from "sequelize";
import db from "./db";

const sequelize = db;

export class Employee extends Model {
	declare rut: string;
	declare name: string;
	declare rank: number;
	declare pass: string;
}

export class Grade extends Model {
	declare id: number;
	declare name: string;
}

export class Lesson extends Model {
	declare id: number;
	declare name: string;
	declare fk_teacher: ForeignKey<string>;
	declare fk_grade: ForeignKey<number>;
}

export class Schedule extends Model {
	declare id: number;
	declare startAt: Date;
	declare endAt: Date;
	declare objective: string | null;
	declare fk_lesson: number;
}

export class Student extends Model {
	declare rut: string;
	declare name: string;
	declare fk_grade: ForeignKey<number>;
}

export class Qualification extends Model {
	declare id: number;
	declare score: number;
	declare fk_lesson: ForeignKey<number>;
	declare fk_student: ForeignKey<string>;
}

export class Observations extends Model {
	declare id: number;
	declare observation: string;
	declare fk_student: ForeignKey<string>;
}

Employee.init(
	{
		rut: {
			type: DataTypes.STRING(11),
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		rank: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		pass: {
			type: DataTypes.STRING(400),
			allowNull: false,
		},
	},
	{
		tableName: "employee",
		sequelize,
	}
);

Grade.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	},
	{
		tableName: "grade",
		sequelize,
	}
);

Lesson.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	},
	{
		tableName: "lesson",
		sequelize,
	}
);

Schedule.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		startAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		endAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		objective: {
			type: DataTypes.STRING(3000),
			allowNull: true,
		},
	},
	{
		tableName: "schedule",
		sequelize,
	}
);

Student.init(
	{
		rut: {
			type: DataTypes.STRING(11),
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	},
	{
		tableName: "student",
		sequelize,
	}
);

Qualification.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		score: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		tableName: "qualification",
		sequelize,
	}
);

Observations.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		observation: {
			type: DataTypes.STRING(3000),
			allowNull: false,
		},
	},
	{
		tableName: "observations",
		sequelize,
	}
);

export const autTest = async () => {
	try {
		await db.authenticate();
		return true;
	} catch (error) {
		return false;
	}
};

const SyncData = async () => {
	if (await autTest()) sequelize.sync();
};

//Associations

Employee.hasMany(Lesson, {
	foreignKey: { allowNull: false, field: "fk_teacher", name: "fk_teacher" },
});
Lesson.belongsTo(Employee, {
	foreignKey: { allowNull: false, field: "fk_teacher", name: "fk_teacher" },
});
Grade.hasMany(Lesson, {
	foreignKey: { allowNull: false, field: "fk_grade", name: "fk_grade" },
});
Lesson.belongsTo(Grade, {
	foreignKey: { allowNull: false, field: "fk_grade", name: "fk_grade" },
});
Lesson.hasMany(Schedule, {
	foreignKey: { allowNull: false, field: "fk_lesson", name: "fk_lesson" },
});
Schedule.belongsTo(Lesson, {
	foreignKey: { allowNull: false, field: "fk_lesson", name: "fk_lesson" },
});
Grade.hasMany(Student, {
	foreignKey: { allowNull: false, field: "fk_grade", name: "fk_grade" },
});
Student.belongsTo(Grade, {
	foreignKey: { allowNull: false, field: "fk_grade", name: "fk_grade" },
});
Lesson.hasMany(Qualification, {
	foreignKey: { allowNull: false, field: "fk_lesson", name: "fk_lesson" },
});
Qualification.belongsTo(Lesson, {
	foreignKey: { allowNull: false, field: "fk_lesson", name: "fk_lesson" },
});
Student.hasMany(Qualification, {
	foreignKey: { allowNull: false, field: "fk_student", name: "fk_student" },
});
Qualification.belongsTo(Student, {
	foreignKey: { allowNull: false, field: "fk_student", name: "fk_student" },
});
Student.hasMany(Observations, {
	foreignKey: { allowNull: false, field: "fk_student", name: "fk_student" },
});

SyncData();
