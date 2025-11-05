import models from "../models/index.js";

export const getAllCategories = async (req, res) => {
    try {
        const response = await models.Categoria.findAll()
        res.json(response)
    } catch (error) {
        console.error('Error al buscar ingredientes:', error)
    }
}

