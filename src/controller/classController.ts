import { Request, Response } from "express";
// import { ObjectID as ID } from 'mongodb';
import { getCustomRepository } from "typeorm";
import { Class } from "../models/Classes";
import { ClassesRepositories } from "../repositories/ClassesRepositories";

class ClassController{
    
    async create(request: Request, response: Response){
        try{
            const { name } = request.body;
            const classRepository = getCustomRepository(ClassesRepositories);
            const _class = new Class();
            _class.name = name;
            await classRepository.save(_class);
            return response.status(201).json(_class);
        }catch(error){
            return response.status(400).json(error);
        }
    }

    async update(request: Request, response: Response){
        try{
            const { id, name} = request.body;
            const classRepository = getCustomRepository(ClassesRepositories);
            await classRepository.update({id: id},{name});
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
            const classRepository = getCustomRepository(ClassesRepositories);
            await classRepository.delete({id:String(id)});
            return response.json({message:"Removido com sucesso!"});
        }catch(error){
            return response.status(400).json(error);
        }
    }

    async list(request: Request, response: Response){
        try{
            const classRepository = getCustomRepository(ClassesRepositories);
            const Classes = await classRepository.find();
            return response.json(Classes);
        }catch(error){
            return response.status(400).json(error);
        }
    }
}
export { ClassController };
