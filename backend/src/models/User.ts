import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // adjust path if needed

export class User extends Model {
  public id!: number;
  public name!: string;
  public lastDutyDate?: string;
  public dutyCount?: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastDutyDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    dutyCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default User;