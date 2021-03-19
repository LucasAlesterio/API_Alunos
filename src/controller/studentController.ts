import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { Class } from "../models/Classes";
import { Grade } from "../models/Grades";
import { Student } from "../models/Student";
import { ClassesRepositories } from "../repositories/ClassesRepositories";
import { GradeRepositories } from "../repositories/GradesRepositories";
import { StudentsRepositories } from "../repositories/StudentsRepository";
class StudentController{

    async create(request: Request, response: Response){
        try{

            const { name, classes } = request.body;
            const studentRepository = getCustomRepository(StudentsRepositories);
            const classRepository = getCustomRepository(ClassesRepositories);
            let _class:Class[] = [];
            const allClasses:string[] = classes;
            const conditions = {
                id: In(allClasses)
            }
            if(classes){
                _class = await classRepository.find(conditions);
            }
            const student = new Student();
            student.name = name;
            if(classes){
                student.classes = _class;
            }
            await studentRepository.save(student);
            return response.status(201).json(student);
        }catch(error){
            return response.status(400).json(error);
        }
    }
        
    async update(request: Request, response: Response){
        try{

            const { name,id, classes,grades } = request.body;
            const studentRepository = getCustomRepository(StudentsRepositories);
            const classRepository = getCustomRepository(ClassesRepositories);
            const gradeRepository = getCustomRepository(GradeRepositories);
            if(name){
                await studentRepository.update(id,{name:name});
            }
            if(classes){
                let _class:Class[] = [];
                const allClasses:string[] = classes;
                const conditions = {
                    id: In(allClasses)
                }
                _class = await classRepository.find(conditions);
                const thisStudent = await studentRepository.findOne(id);
                studentRepository.merge(thisStudent,{classes: _class});
                await studentRepository.save(thisStudent);
            }
            if(grades){
                let grade:Grade[] = [];
                const allClasses:string[] = grades;
                const conditions = {
                    id: In(allClasses)
                }
                grade = await gradeRepository.find(conditions);
                const thisStudent = await studentRepository.findOne(id);
                studentRepository.merge(thisStudent,{grades: grade});
                await studentRepository.save(thisStudent);
            }
            return response.json({
                message:"Modificado com sucesso!"
            });
        }catch(error){
            return response.status(400).json(error);
        }
    }

    async delete(request: Request, response: Response){
        try{
            const { id } = request.query;
            const studentRepository = getCustomRepository(StudentsRepositories);
            await studentRepository.delete({id:String(id)});
            return response.json({message:"Removido com sucesso!"});
        }catch(error){
            return response.status(400).json(error);
        }
    }
    
    async list(request: Request, response: Response){
        try{
            const studentRepository = getCustomRepository(StudentsRepositories);
            const Students = await (await studentRepository.find({relations:["classes","grades"]}));
            return response.json(Students);
        }catch(error){
            return response.status(400).json(error);
        }
    }
}
export { StudentController };

