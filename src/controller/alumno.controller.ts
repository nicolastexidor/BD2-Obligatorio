import { Request, Response } from 'express';
import client from '../config/db';
import { AlumnoDTO } from '../dto/alumno.dto';

export const getAlumnos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.query('SELECT * FROM Alumno');
    const alumnos = result.rows.map((alumno: any) => new AlumnoDTO(
      alumno.ci,
      alumno.nombre,
      alumno.eqcampeon,
      alumno.eqsubcampeon,
      alumno.carrera,
      alumno.puntos,
      alumno.contraseña
    ));
    res.json(alumnos);
    console.log(result.rows);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).send('Error al obtener los alumnos');
  }
};
