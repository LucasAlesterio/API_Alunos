import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Class } from './Classes';
import { Grade } from './Grades';

@Entity()
class Student{

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column(type => Class)
    classes: Class[];

    @Column(type => Grade)
    grades: Grade[];

}
export { Student };

