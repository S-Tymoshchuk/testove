import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'todos' })
export class TodoEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Default(false)
  @Column
  completed: boolean;

  @Column
  task: string;
}
