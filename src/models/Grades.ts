import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Classes";
import { Student } from "./Student";

@Entity("grades")
class Grade{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Student, student => student.grades,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    student: Student;

    @OneToOne(() => Class,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    class: Class;

    @Column({ default: null, nullable: true })
    p1: number;

    @Column({ default: null, nullable: true })
    p2: number;

    @Column({ default: null, nullable: true })
    p3: number;

    @Column({ default: null, nullable: true })
    p4: number;

}

export { Grade };

