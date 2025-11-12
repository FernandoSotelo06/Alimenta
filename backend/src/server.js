import app from "./app.js"

import models, { sequelize } from './models/index.js'

const PORT = process.env.PORT || 4000

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