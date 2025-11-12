// src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importa TODAS tus rutas
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import ingredienteRoutes from './routes/ingredienteRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import etiquetaRoutes from './routes/etiquetaRoutes.js';
import recetaRoutes from './routes/receta.routes.js';
import likeRoutes from './routes/likes.routes.js'

const app = express();

// ✅ ¡ESTA ES LA LÍNEA MÁS IMPORTANTE! ✅
// Asegúrate de que 'origin' apunte a tu frontend
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://alimenta.vercel.app'
    ], 
    credentials: true, 
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Registra TODAS tus rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ingredientes', ingredienteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/likes', likeRoutes);

export default app;