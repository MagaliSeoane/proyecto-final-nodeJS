import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import dotenv from 'dotenv';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

//dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ msg: 'API de productos funcionando' });
});

// Rutas principales
app.use('/api', productsRouter);
app.use('/auth', authRouter);

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Recurso no encontrado o ruta inválida'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
