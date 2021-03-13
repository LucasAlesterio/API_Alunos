import { EntityRepository, Repository } from "typeorm";
import { Grade } from "../models/Grades";

@EntityRepository(Grade)
class GradeRepositories extends Repository<Grade>{
}
export { GradeRepositories };