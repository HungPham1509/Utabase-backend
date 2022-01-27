import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1643299002837 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'string',
                    isUnique: true,
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'password',
                    type: 'string',
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'email',
                    type: 'string',
                    isUnique: true,
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'full_name',
                    type: 'string',
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'class',
                    type: 'string',
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'score',
                    type: 'double',
                    precision: 2
                }
            ]
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
