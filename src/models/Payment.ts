import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class Payment extends Model {
  public id!: number;
  public nombre_titular!: string;
  public email!: string;
  public numero_tarjeta!: string;
  public month!: number;
  public year!: number;
  public codigo_seguridad!: string;
  public monto!: number;
  public moneda!: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_titular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_tarjeta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    month: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    year: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    codigo_seguridad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
  }
);

export default Payment;