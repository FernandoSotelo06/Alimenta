// src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importa TODAS tus rutas
import ingredienteRoutes from './routes/ingredienteRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import etiquetaRoutes from './routes/etiquetaRoutes.js';
import recetaRoutes from './routes/recetaRoutes.js';

const app = express();

// ✅ ¡ESTA ES LA LÍNEA MÁS IMPORTANTE! ✅
// Asegúrate de que 'origin' apunte a tu frontend
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Registra TODAS tus rutas
app.use('/api/ingredientes', ingredienteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/recetas', recetaRoutes);

export default app;