import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './Student';

@Entity("classes")
class Class{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Student, student => student.classes,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    student: Student;

    @Column()
    name: string;
}
export { Class };

