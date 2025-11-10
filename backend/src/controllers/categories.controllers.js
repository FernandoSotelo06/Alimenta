import { where } from "sequelize";
import models from "../models/index.js";

export const getAllCategories = async (req, res) => {
    try {
        const response = await models.Categoria.findAll()
        res.json(response)
    } catch (error) {
        console.error('Error al buscar las categorias:', error)
    }
}

export const getCategoriesWithIngredients = async (req, res) => {
  try {
    const categorias = await models.Categoria.findAll({
      include: [
        {
          model: models.Ingrediente,
          as: "ingredientes",
          attributes: ["ingrediente_id", "nombre", "descripcion"],
        },
      ],
      attributes: ["categoria_id", "nombre", "descripcion", "icono"], 
      order: [["categoria_id", "ASC"]],
    });

    res.json(categorias);
  } catch (error) {
    console.error("Error al buscar categorías con ingredientes:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
};