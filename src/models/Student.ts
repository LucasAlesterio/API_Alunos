import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from './Classes';
import { Grade } from './Grades';

@Entity("students")
class Student{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Grade, grade => grade.student,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    grades: Grade[];

    @OneToMany(() => Class, _class => _class.student,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    classes: Class[];

    @Column()
    name: string;

}
export { Student };

