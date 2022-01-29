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
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'full_name',
                    type: 'varchar',
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'class',
                    type: 'varchar',
                    isNullable: true,
                    length: '255'
                },
                {
                    name: 'score',
                    type: 'double',
                    isNullable: true,
                }
            ]
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
