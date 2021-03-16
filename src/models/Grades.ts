import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Classes";
import { Student } from "./Student";
// import { Class } from "./Classes";

@Entity("grades")
class Grade{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // @Column(type => Class)
    // class: Class;
    
    // @Column()
    // id_class: string;
    //@ManyToOne()
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

