import { Request, Response } from 'express';
import client from '../config/db';
import { AlumnoDTO } from '../dto/alumno.dto';
import bcrypt from 'bcrypt';
import { LeaderBoardResponseDTO } from '../dto/response/leaderBoard.response.dto';
import jwt from 'jsonwebtoken';
import { alumnoRole, jwtKey } from '../constants/constants';
import { INVALID_CREDENTIALS_ERROR, USER_ALREADY_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from '../constants/errors';
import { RegisterAlumnoDTO } from '../dto/request/register.alumno.dto';

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
      ''
    ));
    res.json(alumnos);
    console.log(result.rows);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).send('Error al obtener los alumnos');
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { ci, nombre, eqcampeon, eqsubcampeon, carrera, contraseña } = req.body;
  const alumnoData = new RegisterAlumnoDTO(ci, nombre, eqcampeon, eqsubcampeon, carrera, contraseña);
  try {
    const resultAlumnos = await client.query('SELECT * FROM Alumno WHERE ci = $1', [alumnoData.ci]);
    const resultAdmins = await client.query('SELECT * FROM Administrador WHERE ci = $1', [alumnoData.ci]);
    if (resultAlumnos.rows.length > 0 || resultAdmins.rows.length > 0) {
      res.status(400).send({message: USER_ALREADY_EXISTS_ERROR});
      return;
    }

    const hashedPassword = await bcrypt.hash(alumnoData.contraseña, 10);
    const result = await client.query(
      'INSERT INTO Alumno (ci, nombre, eqcampeon, eqsubcampeon, carrera, puntos, contraseña) VALUES ($1, $2, $3, $4, $5, 0, $6)', 
      [alumnoData.ci, alumnoData.nombre, alumnoData.eqcampeon, alumnoData.eqsubcampeon, alumnoData.carrera, hashedPassword]);
    const token = jwt.sign({ ci, role: alumnoRole }, jwtKey);
    res.status(201).send({ message: 'Alumno creado', token });
  } catch (error) {
    console.error('Error al crear el alumno:', error);
    res.status(500).send('Error al crear el alumno');
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { ci, contraseña } = req.body;

  try {
    const result = await client.query('SELECT * FROM Alumno WHERE ci = $1', [ci]);
    if (result.rows.length === 0) {
      res.status(404).send({message: USER_NOT_FOUND_ERROR});
      return;
    }
    const alumno: AlumnoDTO = result.rows[0];
    const validPassword = await bcrypt.compare(contraseña, alumno.contraseña);
    if (validPassword) {
      const token = jwt.sign({ ci, role: alumnoRole }, jwtKey);
      res.status(200).json({ message: 'Alumno logueado', token });
    } else {
      res.status(401).send({message: INVALID_CREDENTIALS_ERROR});
    }
  } catch (error) {
    console.error('Error al loguear el alumno:', error);
    res.status(500).send('Error al loguear el alumno');
  }
}

export const getPuntos = async (req: Request, res: Response): Promise<void> => {
  let ci = req.ci;
  try {
    const result = await client.query('SELECT puntos FROM Alumno WHERE ci = $1', [ci]);
    if (result.rows.length === 0) {
      res.status(404).send({message: USER_NOT_FOUND_ERROR});
      return;
    }
    const puntos = result.rows[0].puntos;
    res.json({ci, puntos });
  } catch (error) {
    console.error('Error al obtener los puntos del alumno:', error);
    res.status(500).send('Error al obtener los puntos del alumno');
  }
}

export const getLeaderBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.query('SELECT * FROM Alumno ORDER BY puntos DESC');
    const alumnos = result.rows.map((alumno: any) => new LeaderBoardResponseDTO(
      alumno.nombre,
      alumno.puntos,
      alumno.carrera
    ));
    res.json(alumnos);
  } catch (error) {
    console.error('Error al obtener el leaderboard:', error);
    res.status(500).send('Error al obtener el leaderboard');
  }
}