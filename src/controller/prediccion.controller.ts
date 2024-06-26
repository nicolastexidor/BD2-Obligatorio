import { Request, Response } from 'express';
import client from '../config/db';
import { PrediccionDTO } from '../dto/prediccion.dto';
import moment from 'moment';
import { INVALID_TOKEN_ERROR, USER_NOT_AUTHORIZED_ERROR } from '../constants/errors';

export const addPrediccion = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    if (!ci) {
        res.status(401).send({message: USER_NOT_AUTHORIZED_ERROR});
        return;
    }
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora } = req.body;
    try {
        const existingPrediction = await client.query(
            'SELECT * FROM Prediccion WHERE ciAlumno = $1 AND eqloc = $2 AND eqvis = $3 AND fechahora = $4',
            [ci, eqLoc, eqVis, fechaHora]
        );
        if (existingPrediction.rows.length > 0) {
            res.status(400).send({message: 'Ya existe una predicción del alumno para este partido'});
            return;
        }

        const existingPartido = await client.query('SELECT * FROM Partido WHERE eqloc = $1 AND eqvis = $2 AND fechahora = $3', [eqLoc, eqVis, fechaHora]);
        if (existingPartido.rows.length === 0) {
            res.status(400).send({message: 'El partido no existe'});
            return;
        }

        const prediccion = new PrediccionDTO(ci, 0, eqLoc, eqVis, golesLoc, golesVis, fechaHora);
        if(moment(moment.now()).isAfter(moment(fechaHora).subtract(1, 'hours'))){
            res.status(400).send({message: 'Ya no se pueden agregar predicciones para este partido'});
            return;
        }
        const result = await client.query(
            'INSERT INTO Prediccion (cialumno, puntosotorgados, eqloc, eqvis, golesloc, golesvis, fechahora) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [prediccion.CIAlumno, prediccion.PuntosOtorgados, prediccion.eqLoc, prediccion.eqVis, prediccion.GolesLoc, prediccion.GolesVis, prediccion.FechaHora]);
        res.status(201).send({message: 'Predicción creada'});
    } catch (error) {
        console.error('Error al crear la predicción:', error);
        res.status(500).send({message: 'Error al crear la predicción'});
    }
}

export const getPredicciones = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    try {
        const result = await client.query('SELECT * FROM Prediccion WHERE ciAlumno = $1', [ci]);
        if (result.rows.length === 0) {
            res.status(404).send('No se encontraron predicciones para el alumno');
            return;
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener las predicciones:', error);
        res.status(500).send('Error al obtener las predicciones');
    }
}

export const updatePrediccion = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora } = req.body;
    try {
        const existingPrediction = await client.query(
            'SELECT * FROM Prediccion WHERE ciAlumno = $1 AND eqloc = $2 AND eqvis = $3 AND fechahora = $4',
            [ci, eqLoc, eqVis, fechaHora]
        );
        if (existingPrediction.rows.length === 0) {
            res.status(400).send({message: 'No existe una predicción del alumno para este partido'});
            return;
        }
        const prediction = existingPrediction.rows[0];
        if(moment(moment.now()).isAfter(moment(prediction.fechahora).subtract(1, 'hours'))){
            res.status(400).send({message: 'Ya no se pueden modificar predicciones para este partido'});
            return;
        }
        const result = await client.query(
            'UPDATE Prediccion SET golesloc = $4, golesvis = $5 WHERE ciAlumno = $1 AND eqloc = $2 AND eqvis = $3 AND fechahora = $6',
            [ci, eqLoc, eqVis, golesLoc, golesVis, fechaHora]
        );
        res.status(200).send({message: 'Predicción modificada'});
    } catch (error) {
        console.error('Error al modificar la predicción:', error);
        res.status(500).send({message: 'Error al modificar la predicción'});
    }
}

export const updateFinal = async (req: Request, res: Response): Promise<void> => {
    try {
        const {eqSubCampeon, eqCampeon} = req.body;
        const result = await client.query(
            'SELECT * FROM Partido WHERE golesloc IS NULL AND golesvis IS NULL'
        );
        if (result.rows.length > 0) {
            res.status(400).send({message: 'Aún hay partidos sin resultados'});
            return;
        }
        const alumnos = await client.query('SELECT * FROM Alumno');
        for(let i = 0; i < alumnos.rows.length; i++){
            const alumno = alumnos.rows[i];
            let points = 0;
            if(alumno.eqsubcampeon === eqSubCampeon){
                points += 5;
            }
            if(alumno.eqcampeon === eqCampeon){
                points += 10;
            }
            await client.query('UPDATE Alumno SET puntos = puntos + $1 WHERE ci = $2', [points, alumno.ci]);
        }
        res.status(200).send({message: 'Resultados finales actualizados'});
    } catch (error) {
        console.error('Error al actualizar los resultados:', error);
        res.status(500).send('Error al actualizar los resultados');
    }
}