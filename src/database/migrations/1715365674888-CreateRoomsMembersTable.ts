import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoomsMembersTable1715365674888
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rooms_members_users',
        columns: [
          { name: 'room_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            columnNames: ['room_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rooms',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooms_members_users');
  }
}
