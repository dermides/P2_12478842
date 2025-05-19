import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Contactos extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public comentario!: string;
  public fecha_at!: Date;
  public direccion_ip!: string;
  public pais!: string;
}

Contactos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    pais:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'contactos',
    timestamps: true,
  }
);

export default Contactos;