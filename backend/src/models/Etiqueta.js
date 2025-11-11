import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Etiqueta = sequelize.define(
    "Etiqueta",
    {
      etiqueta_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      color: {
        type: DataTypes.STRING(7),
        defaultValue: "#6B7280",
        allowNull: true
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "etiquetas",
      timestamps: false,
    }
  );

  return Etiqueta;
};