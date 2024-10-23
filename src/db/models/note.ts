import { DataTypes, Model } from 'sequelize';
import Person from '@/db/models/person';
import sequelize from '@/db/db';

class Note extends Model {
  public id!: string;
  public personId!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    personId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'note',
    timestamps: true,
  }
);

Person.hasMany(Note, { foreignKey: 'personId' });
Note.belongsTo(Person, { foreignKey: 'personId' });

export default Note;