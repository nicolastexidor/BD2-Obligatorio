import express from 'express';
import alumnoRoutes from './routes/alumno.routes';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api', alumnoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
