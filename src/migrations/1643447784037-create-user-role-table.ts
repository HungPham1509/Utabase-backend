import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createUserRoleTable1643447784037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_role",
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'role_id',
                    type: 'int',
                    isPrimary: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey(
          "user_role",
          new TableForeignKey({
              columnNames: ["user_id"],
              referencedTableName: "user",
              referencedColumnNames: ["id"]
          })
        );

        await queryRunner.createForeignKey(
          "user_role",
          new TableForeignKey({
              columnNames: ["role_id"],
              referencedTableName: "role",
              referencedColumnNames: ["id"]
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_role');
    }

}
