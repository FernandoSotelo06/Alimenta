import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING(20),
        defaultValue: "user",
        validate: {
          isIn: [["user", "admin"]],
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      avatar: {
        type: DataTypes.TEXT,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
    }
  );

  return Usuario;
};