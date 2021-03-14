import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
class Class{

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;
    
}
export { Class };

