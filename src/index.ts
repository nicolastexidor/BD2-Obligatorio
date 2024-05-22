import express from 'express';
import alumnoRoutes from './routes/alumno.routes';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api', alumnoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
FUNCIONALIDADES A IMPLEMENTAR:
Nuevos endpoints:
1. obtener un alumno por su CI.
2. agregar partido, solo administrador (controlado en front)
3. obtener partidos
4. Crear partido, pero sin el resultado cargado todavia
5. luego de terminado un partido actualizar resultado, ir a las predicciones que hicieron los alumnos y actualizar los puntos de cada uno
6. register para alumno
7. login para alumno
9. get puntos de alumno
11. leaderboard de alumnos
12. alumno crea prediccion, solo si falta una hora o mas para el partido y no tenga una prediccion ya hecha
13. modificar prediccion, hasta una hora antes
14. al crear alumno, verificar cedula sea correcta
15. ver predicciones del usuario
*/