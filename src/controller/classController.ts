import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClassesRepositories } from "../repositories/ClassesRepositories";

class ClassController{
    async create(request: Request, response: Response){
        const { name } = request.body;
        const classRepository = getCustomRepository(ClassesRepositories);
        const Class = classRepository.create({
            name
        })
        await classRepository.save(Class);
        return response.status(201).json(Class);
    }

    async update(request: Request, response: Response){
        const { id, name} = request.body;
        const classRepository = getCustomRepository(ClassesRepositories);
        await classRepository.update({id},{name});
        return response.json({
            message:"Modificado com sucesso!"
        });
    }

    async delete(request: Request, response: Response){
        const { id } = request.query;
        const classRepository = getCustomRepository(ClassesRepositories);
        await classRepository.delete({id:String(id)});
        return response.json({message:"Removido com sucesso!"});
    }

    async list(request: Request, response: Response){
        const classRepository = getCustomRepository(ClassesRepositories);
        const Classes = await classRepository.find();
        return response.json(Classes);
    }
}
export { ClassController };