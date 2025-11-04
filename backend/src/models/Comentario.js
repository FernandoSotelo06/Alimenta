import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Comentario = sequelize.define(
    "Comentario",
    {
      comentario_id: {
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
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "usuario_id",
        },
        onDelete: "CASCADE",
      },
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      calificacion: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      padre_comentario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "comentarios",
          key: "comentario_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "comentarios",
      timestamps: false,
    }
  );

  return Comentario;
};