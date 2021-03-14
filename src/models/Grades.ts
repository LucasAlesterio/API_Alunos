import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Class } from "./Classes";

@Entity()
class Grade{

    @ObjectIdColumn()
    _id: ObjectID;

    @Column(type => Class)
    class: Class
    
    @Column()
    p1: number;

    @Column()
    p2: number;

    @Column()
    p3: number;

    @Column()
    p4: number;

}

export { Grade };

