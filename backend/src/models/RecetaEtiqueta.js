import { DataTypes } from "sequelize";

export default (sequelize) => {
  const RecetaEtiqueta = sequelize.define(
    "RecetaEtiqueta",
    {
      receta_etiqueta_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      etiqueta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "etiquetas",
          key: "etiqueta_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "receta_etiquetas",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["receta_id", "etiqueta_id"],
        },
      ],
    }
  );

  return RecetaEtiqueta;
};