import { AlumnoDTO } from '../dto/alumno.dto';
import { Pool } from 'pg';

// Configuración de la conexión a la base de datos
const config = {
  host: 'localhost',
  database: 'postgres',
  port: 5432, // Puerto por defecto de PostgreSQL
  searchPath: ['Obligatorio'] 
};


// Create a connection pool
const pool = new Pool(config);

async function queryDB(query: string, params: any[] = []) {
  const client = await pool.connect();
  
  try {
    await client.query('SET search_path TO Obligatorio');
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
  
  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  } finally {
    try {
      await client.release();
    } catch (err) {
      console.error('Error closing connection', err);
    }
  }
}

// Función para realizar una consulta a la base de datos y devolver una lista de objetos AlumnoDTO
async function consultarAlumnos(): Promise<AlumnoDTO[]> {
  const query = 'SELECT * FROM Alumno';
  try {
    const alumnosResult = await queryDB(query);
    // Mapear los resultados a objetos AlumnoDTO
    const alumnosDTO: AlumnoDTO[] = alumnosResult.map((alumno: any) => {
      return new AlumnoDTO(alumno.CI, alumno.Nombre, alumno.EqCampeon, alumno.EqSubcampeon, alumno.Carrera, alumno.Puntos, alumno.Contraseña);
    });
    return alumnosDTO;
  } catch (error) {
    console.error('Error al consultar los alumnos:', error);
    throw error;
  }
}

// Ejemplo de uso
async function obtenerYMostrarAlumnos() {
  try {
    const alumnos = await consultarAlumnos();
    console.log('Alumnos:');
    console.log(alumnos);
  } catch (error) {
    console.error('Error al obtener y mostrar los alumnos:', error);
  }
}

// Llamar a la función para obtener y mostrar los alumnos
obtenerYMostrarAlumnos();
