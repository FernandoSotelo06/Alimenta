import app from "./app.js"

import models, { sequelize } from './models/index.js'

const findIngredients = async () => {
    try {
        const ingredientes = await models.Ingrediente.findAll()
        console.log('Ingredientes encontrados:', ingredientes.length)
        console.log(ingredientes)
    } catch (error) {
        console.error('Error al buscar ingredientes:', error)
    }
}

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await sequelize.authenticate()
          .then(() => {console.log('Conectado a PostgreSQL')})
          .catch((err) => {'Error en la conexión a la DB: ', err})
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    } catch (err) {
        console.error('Error al conectar:', err)
        process.exit(1)
    }
}

startServer()