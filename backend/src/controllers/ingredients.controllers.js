import models from '../models/index.js'

export const getAllIngredients = async (req, res) => {
    try {
        const response = await models.Ingrediente.findAll()
        res.json(response)
    } catch (error) {
        console.error('Error al buscar ingredientes:', error)
    }
}

export const getIngredientsForCategory = async (req, res) => {
    try {
        const response = await models.Ingrediente.findAll({
            
        })
        res.json(response)
    } catch (error) {
        console.error('Error al buscar ingredientes:', error)
    }
}