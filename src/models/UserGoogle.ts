import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Users extends Model {
  public id!: number;
  public googleId!: string;
  public correo!: string;
  public username!: string;
  public readonly password_hash?: string; // Optional, if you don't want to store password_hash
  
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
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
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