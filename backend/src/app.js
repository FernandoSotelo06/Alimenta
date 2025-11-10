import express from 'express'
import morgan from 'morgan';
import cors from 'cors';

//RUTAS
import categoriesRoutes from './routes/categories.routes.js'
import ingredientsRoutes from './routes/ingredients.routes.js'

const app = express()

app.use(cors({
    origin: [
        'http://localhost:3000'
    ], 
    credentials: true, 
}));

app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/api', categoriesRoutes)
app.use('/api', ingredientsRoutes)

export default app