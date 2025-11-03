//Carga de variables de entorno
import dotenv from 'dotenv'
dotenv.config()

// App con los endpoints
import app from "./app.js"

// Base de datos
const { sequelize } = await import("./db.js")

const PORT = process.env.PORT

sequelize.authenticate()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error al conectar:', err))

app.listen(PORT)
console.log(`Servidor corriendo en el puerto ${PORT}`)