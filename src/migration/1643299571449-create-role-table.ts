import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRoleTable1643299571449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "role",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'string',
                    isUnique: true,
                    isNullable: false,
                    length: '255'
                },
                {
                    name: 'state',
                    type: 'int',
                    isNullable: false
                }
            ]
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role");
    }

}
