import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from './Grades';
import { Student } from './Student';

@Entity("classes")
class Class{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToMany(() => Student, student => student.classes,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    student: Student[];

    @Column()
    name: string;

    @OneToMany(()=>Grade,grade=>grade.class,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    grade: Grade;
}
export { Class };

