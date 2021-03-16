import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './Student';

@Entity("classes")
class Class{

    // @ObjectIdColumn()
    // _id: ObjectID;

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Student, student => student.classes,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    student: Student;

    @Column()
    name: string;
}
export { Class };

