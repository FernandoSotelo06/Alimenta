import { DataTypes } from "sequelize";

export default (sequelize) => {
  const RecetaIngrediente = sequelize.define(
    "RecetaIngrediente",
    {
      receta_ingrediente_id: {
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
      ingrediente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ingredientes",
          key: "ingrediente_id",
        },
        onDelete: "CASCADE",
      },
      cantidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unidad: {
        type: DataTypes.STRING(50),
      },
      notas: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "receta_ingredientes",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["receta_id", "ingrediente_id"],
        },
      ],
    }
  );

  return RecetaIngrediente;
};