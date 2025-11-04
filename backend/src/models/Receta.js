import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Receta = sequelize.define(
    "Receta",
    {
      receta_id: {
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
      titulo: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      instrucciones: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      tiempo_preparacion: {
        type: DataTypes.INTEGER,
      },
      porciones: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      dificultad: {
        type: DataTypes.STRING(20),
        defaultValue: "fácil",
        validate: {
          isIn: [["fácil", "intermedio", "difícil"]],
        },
      },
      imagen_principal: {
        type: DataTypes.STRING(255),
      },
      galeria_imagenes: {
        type: DataTypes.JSONB,
      },
      video_url: {
        type: DataTypes.STRING(255),
      },
      activa: {
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
      total_calorias: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_proteinas: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_carbohidratos: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_grasas: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_fibra: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      calificacion_promedio: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
      },
    },
    {
      tableName: "recetas",
      timestamps: false,
    }
  );

  return Receta;
};