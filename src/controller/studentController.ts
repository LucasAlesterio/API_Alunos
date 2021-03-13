import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { StudentsRepositories } from "../repositories/StudentsRepository";

class StudentController{

    async create(request: Request, response: Response){
        const { name, classes } = request.body;
        
        const studentRepository = getCustomRepository(StudentsRepositories);

        const Student = studentRepository.create({
            name, id_classes:classes
        })
        await studentRepository.save(Student);
        return response.status(201).json(Student);
    }

    async update(request: Request, response: Response){
        const { name,id, classes } = request.body;
        const studentRepository = getCustomRepository(StudentsRepositories);
        if(name){
            await studentRepository.update({id:id},{name: name});
        }
        if(classes){
            await studentRepository.update({id:id},{id_classes: classes});
        }
        return response.json({
            message:"Modificado com sucesso!"
        });
    }

    async delete(request: Request, response: Response){
        const { id } = request.query;
        const studentRepository = getCustomRepository(StudentsRepositories);
        await studentRepository.delete({id: String(id)});
        return response.json({message:"Removido com sucesso!"});
    }
    
    async list(request: Request, response: Response){
        const studentRepository = getCustomRepository(StudentsRepositories);
        const Students = await studentRepository.find();
        return response.json(Students);
    }
}
export { StudentController }