import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Grade } from "../models/Grades";
import { Student } from "../models/Student";
import { ClassesRepositories } from "../repositories/ClassesRepositories";
import { GradeRepositories } from "../repositories/GradesRepositories";
import { StudentsRepositories } from "../repositories/StudentsRepository";
//docker run --name postgresDB -e POSTGRES_PASSWORD=000000 -e POSTGRES_USER=postgres -e POSTGRES_DB=asa_tb1 -p 5432:5432 -d postgres  
class GradeController{
    async create(request: Request, response: Response){
        try{
            const { id_class , id_student, p1, p2, p3, p4 } = request.body;
            const gradeRepository = getCustomRepository(GradeRepositories);
            const studentRepository = getCustomRepository(StudentsRepositories);
            const classRepository = getCustomRepository(ClassesRepositories);

            if(id_class && id_student){
                const grade = new Grade();
                const _class = await classRepository.findOne({id:id_class});
                grade.class = _class;
                if(p1){
                    grade.p1 = p1;
                }
                if(p2){
                    grade.p2 = p2;
                }
                if(p3){
                    grade.p3 = p3;
                }
                if(p4){
                    grade.p4 = p4;
                }
                const student = await studentRepository.findOne({id:id_student},{relations:["grades"]});
                const gradeSaved = await gradeRepository.save(grade);
                if(student.id && gradeSaved.id){
                    let allGrades:Grade[] = [gradeSaved];
                    if(student.grades && student.grades.length > 0){
                        allGrades = allGrades.concat(student.grades);
                    }
                    let thisStudent = new Student();
                    thisStudent = student;
                    thisStudent.grades = allGrades;
                    await studentRepository.save(thisStudent);
                    return response.status(201).json({
                        message:"Nota cadastrada com sucesso!",
                        thisStudent
                    });
                }
            }
        }catch(error){
            return response.status(400).json(error);
        }
    }

    async update(request: Request, response: Response){
        try{
            const { id_grade, id_class,  p1, p2, p3, p4 }  = request.body;
            const gradeRepository = getCustomRepository(GradeRepositories);
            const classRepository = getCustomRepository(ClassesRepositories);
            let Class = {};
            let values = {};
            if(id_class){
                const thisGrade = await gradeRepository.findOne({id: id_grade});
                const thisClass = await classRepository.findOne({id:id_class});
                await gradeRepository.merge(thisGrade,{class:thisClass});
                Class = thisClass;
                await gradeRepository.save(thisGrade);
            }
            if(p1){
                values['p1'] = p1;
            }
            if(p2){
                values['p2'] = p2;
            }
            if(p3){
                values['p3'] = p3;
            }
            if(p4){
                values['p4'] = p4;
            }
            await gradeRepository.update({id:id_grade},values);
            return response.json([values,(id_class && Class)]);

        }catch(error){
            return response.status(400).json(error);
        }
    }

    async delete(request: Request, response: Response){
        try{
            const { id } = request.query;
            const gradeRepository = getCustomRepository(GradeRepositories);
            await gradeRepository.delete({id:String(id)});
            return response.json({message:"Removido com sucesso!"});
        }catch(error){
            return response.status(400).json(error);
        }
    }

    async list(request: Request, response: Response){
        try{
            const { student } = request.query;
            const studentRepository = getCustomRepository(StudentsRepositories);
            const gradeRepository = getCustomRepository(GradeRepositories);

            if(student){
                const studentData = await studentRepository.findOne({name:String(student)},{relations:["grades"]});
                if(studentData.grades){
                    const idsGrades: string[] = studentData.grades.map(grade => String(grade.id));
                    const allGrades = await gradeRepository.find({relations:["class"]});
                    let grades = [];
                    if(allGrades){
                        grades = allGrades.filter((g)=>( idsGrades.includes(g.id) ));
                    }

                    const statusStudent = grades.map((grade)=>{
                        let total = 0;
                        total += grade.p1 && grade.p1;
                        total += grade.p2 && grade.p2;
                        total += grade.p3 && grade.p3;
                        total += grade.p4 && grade.p4;
                        const status = {class: grade.class.name,total,status:(total > 60 ? "Aprovado":"Reprovado")}
                        return status;
                    });
                    return response.json({Student: studentData.name,statusStudent});
                }else{
                    return response.json({message: "Não há notas cadastradas!"});
                }
            }else{
                const Grades = await gradeRepository.find({relations:["class"]});
                return response.json(Grades);
            }
            
        }catch(error){
            return response.status(400).json(error);
        }
    }
}
export { GradeController };
