import express from 'express';
import alumnoRoutes from './routes/alumno.routes';
import prediccionRoutes from './routes/prediccion.routes';
import partidoRoutes from './routes/partido.routes';
import equipoRoutes from './routes/equipo.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/prediccion', prediccionRoutes);
app.use('/api/partido', partidoRoutes);
app.use('/api/equipo', equipoRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
FUNCIONALIDADES A IMPLEMENTAR:
Nuevos endpoints:
1. obtener un alumno por su CI. DONE
2. agregar partido, solo administrador. DONE
3. obtener partidos. DONE
4. Crear partido, pero sin el resultado cargado todavia. DONE
5. luego de terminado un partido actualizar resultado, ir a las predicciones que hicieron los alumnos y actualizar los puntos de cada uno. DONE
6. register para alumno. DONE
7. login para alumno. DONE
9. get puntos de alumno. DONE
11. leaderboard de alumnos. DONE
12. alumno crea prediccion, solo si falta una hora o mas para el partido y no tenga una prediccion ya hecha. DONE
13. modificar prediccion, hasta una hora antes. DONE
14. al crear alumno, verificar cedula sea correcta
15. ver predicciones del usuario. DONE
*/