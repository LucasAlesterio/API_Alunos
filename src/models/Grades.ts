import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Class } from "./Classes";
import { Student } from "./Student";

@Entity("classes")
class Grade{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    value: number;

    @Column()
    id_class: string;

    @Column()
    id_student: string;

    @OneToOne(()=>Class, Class=>Class.id)
    @JoinColumn({name :"id_class"})
    class: Class;

    @OneToOne(()=> Student, Student=> Student.id)
    @JoinColumn({name:"id_student"})
    student: Student;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}
export { Grade };