import { Request, Response } from "express";
import { ObjectID as ID } from 'mongodb';
import { getCustomRepository } from "typeorm";
import { Student } from "../models/Student";
import { ClassesRepositories } from "../repositories/ClassesRepositories";
import { StudentsRepositories } from "../repositories/StudentsRepository";

class StudentController{

    async create(request: Request, response: Response){
        const { name, classes } = request.body;
        const studentRepository = getCustomRepository(StudentsRepositories);
        const classRepository = getCustomRepository(ClassesRepositories);
        let allClasses = [];
        if(classes){
            allClasses = classes.map(id=>new ID(id));
        }
        const _class = await classRepository.find({
            where:{
                _id:{$in:allClasses}
            }
        })
        const student = new Student();
        student.name = name;
        if(classes && _class){
            student.classes = _class;
        }
        await studentRepository.save(student);
        return response.status(201).json(student);
    }

    async update(request: Request, response: Response){
        const { name,id, classes } = request.body;
        const studentRepository = getCustomRepository(StudentsRepositories);
        const classRepository = getCustomRepository(ClassesRepositories);
        let allClasses = [];
        if(classes){
            allClasses = classes.map(id=>new ID(id));
        }
        const _class = await classRepository.find({
            where:{
                _id:{$in:allClasses}
            }
        })
        if(name){
            await studentRepository.update({_id:new ID(id)},{name: name});
        }
        if(classes){
            await studentRepository.update({_id:new ID(id)},{classes: _class});
        }
        return response.json({
            message:"Modificado com sucesso!"
        });
    }

    async delete(request: Request, response: Response){
        const { id } = request.query;
        const studentRepository = getCustomRepository(StudentsRepositories);
        await studentRepository.delete({_id:new ID(String(id))});
        return response.json({message:"Removido com sucesso!"});
    }
    
    async list(request: Request, response: Response){
        const studentRepository = getCustomRepository(StudentsRepositories);
        const Students = await studentRepository.find();
        return response.json(Students);
    }
}
export { StudentController };
