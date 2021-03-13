import { EntityRepository, Repository } from "typeorm";
import { Student } from "../models/Student";

@EntityRepository(Student)
class StudentsRepositories extends Repository<Student>{
}
export { StudentsRepositories };