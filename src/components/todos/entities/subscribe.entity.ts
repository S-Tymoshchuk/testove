import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'subscribe' })
export class SubscribeEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  url: string;
}
