import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { GradeRepositories } from "../repositories/GradesRepositories";
import { StudentsRepositories } from "../repositories/StudentsRepository";

class GradeController{
    async create(request: Request, response: Response){
        const { id_class, id_student, p1, p2, p3, p4 } = request.body;
        const gradeRepository = getCustomRepository(GradeRepositories);

        const gradeP1 = gradeRepository.create({id_class, id_student, value:p1});
        const gradeP2 = gradeRepository.create({id_class, id_student, value:p2});
        const gradeP3 = gradeRepository.create({id_class, id_student, value:p3});
        const gradeP4 = gradeRepository.create({id_class, id_student, value:p4});

        await gradeRepository.save([gradeP1,gradeP2,gradeP3,gradeP4]);
        response.status(201).json([gradeP1,gradeP2,gradeP3,gradeP4]);
    }

    async update(request: Request, response: Response){

    }

    async delete(request: Request, response: Response){
        
    }

    async list(request: Request, response: Response){
        const {student} = request.body;
        const studentRepository = getCustomRepository(StudentsRepositories);
        const studentData = await studentRepository.findOne({name:student});
        
        const gradeRepository = getCustomRepository(GradeRepositories);
        const Grades = await gradeRepository.find({})
    }
}
export { GradeController }