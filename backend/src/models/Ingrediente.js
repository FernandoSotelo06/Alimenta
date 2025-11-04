import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Ingrediente = sequelize.define(
    "Ingrediente",
    {
      ingrediente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      unidad: {
        type: DataTypes.STRING(50),
      },
      cantidad_base: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      calorias: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      proteinas: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      carbohidratos: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      grasas: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      fibra: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      azucares: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      sodio: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0,
      },
      vitaminas: {
        type: DataTypes.JSONB,
      },
      minerales: {
        type: DataTypes.JSONB,
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "categorias",
          key: "categoria_id",
        },
        onDelete: "SET NULL",
      },
      imagen: {
        type: DataTypes.STRING(255),
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
    },
    {
      tableName: "ingredientes",
      timestamps: false,
    }
  );

  return Ingrediente;
};