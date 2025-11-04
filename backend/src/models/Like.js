import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Like = sequelize.define(
    "Like",
    {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "usuario_id",
        },
        onDelete: "CASCADE",
      },
      receta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "recetas",
          key: "receta_id",
        },
        onDelete: "CASCADE",
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "likes",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["usuario_id", "receta_id"],
        },
      ],
    }
  );

  return Like;
};