import { EntityRepository, FindConditions, FindOneOptions, Repository } from "typeorm";
import { Class } from "../models/Classes";

@EntityRepository(Class)
class ClassesRepositories extends Repository<Class>{
}
export { ClassesRepositories };