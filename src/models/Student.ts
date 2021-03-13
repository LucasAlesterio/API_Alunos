import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Class } from './Classes';

@Entity("students")
class Student{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column("simple-array")
    id_classes: string[]; 

    @ManyToMany(()=>Class, Class => Class.id)
    @JoinColumn({name:"id_classes"})
    classes: Class[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}
export { Student };

