import { Request, Response } from "express";
import { ObjectID as ID } from 'mongodb';
import { getCustomRepository } from "typeorm";
import { Class } from "../models/Classes";
import { ClassesRepositories } from "../repositories/ClassesRepositories";

class ClassController{
    async create(request: Request, response: Response){
        const { name } = request.body;
        const classRepository = getCustomRepository(ClassesRepositories);
        const _class = new Class();
        _class.name = name;
        await classRepository.save(_class);
        return response.status(201).json(_class);
    }

    async update(request: Request, response: Response){
        const { id, name} = request.body;
        const classRepository = getCustomRepository(ClassesRepositories);
        await classRepository.update({_id: new ID(id)},{name});
        return response.json({
            message:"Modificado com sucesso!"
        });
    }

    async delete(request: Request, response: Response){
        const { id } = request.query;
        const classRepository = getCustomRepository(ClassesRepositories);
        await classRepository.delete({_id: new ID(String(id))});
        return response.json({message:"Removido com sucesso!"});
    }

    async list(request: Request, response: Response){
        const classRepository = getCustomRepository(ClassesRepositories);
        const Classes = await classRepository.find();
        return response.json(Classes);
    }
}
export { ClassController };
