import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStudent1615583157383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "students",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name:"id_classes",
                        type: "array",
                        isArray: true,
                        isNullable: true
                    }
                ],
                foreignKeys:[
                    {
                        name: "FKClasses",
                        referencedTableName: "classes",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_classes"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }

}
