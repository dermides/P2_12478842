import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Users extends Model {
  public id!: number;
  public username!: string;
  public password_hash!: string;
  
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    tableName: 'user',
    timestamps: true,
  }
);

export default Users;