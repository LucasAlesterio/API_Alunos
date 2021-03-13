import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGrades1615585698458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "grades",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "value",
                        type: "number"
                    },
                    {
                        name: "id_class",
                        type: "uuid"
                    },
                    {
                        name: "id_student",
                        type: "uuid"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FKClass",
                        referencedTableName: "classes",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_class"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKStudent",
                        referencedTableName: "students",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_student"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("grades");
    }

}
