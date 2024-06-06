import { Request, Response } from 'express';
import client from '../config/db';
import { PartidoDTO } from '../dto/partido.dto';
import { INVALID_TOKEN_ERROR, USER_NOT_FOUND_ERROR } from '../constants/errors';

export const addPartido = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    if (!ci) {
        res.status(401).send({message: INVALID_TOKEN_ERROR});
        return;
    }
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadio } = req.body;
    try {
        const admin = await client.query('SELECT * FROM Administrador WHERE ci = $1', [ci]);
        if(admin.rows.length === 0){
            res.status(401).send({message: USER_NOT_FOUND_ERROR});
            return;
        }
        const partido = new PartidoDTO(eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadio);
        const result = await client.query(
            'INSERT INTO Partido (eqloc, eqvis, golesloc, golesvis, fechahora, estadio) VALUES ($1, $2, $3, $4, $5, $6)',
            [partido.eqloc, partido.eqvis, partido.golesloc, partido.golesvis, partido.fechahora, partido.estadio]);
        res.status(201).send('Partido creado');
    } catch (error) {
        console.error('Error al crear el partido:', error);
        res.status(500).send('Error al crear el partido');
    }
}

export const getPartidos = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await client.query('SELECT * FROM Partido');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        res.status(500).send('Error al obtener los partidos');
    }
};

export const updatePartido = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    if (!ci) {
        res.status(401).send({message: INVALID_TOKEN_ERROR});
        return;
    }
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadio } = req.body;
    try {
        const admin = await client.query('SELECT * FROM Administrador WHERE ci = $1', [ci]);
        if(admin.rows.length === 0){
            res.status(401).send({message: USER_NOT_FOUND_ERROR});
            return;
        }
        const partido = new PartidoDTO(eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadio);
        const result = await client.query(
            'UPDATE Partido SET golesloc = $3, golesvis = $4 WHERE eqloc = $1 AND eqvis = $2 AND fechahora = $5 AND golesloc IS NULL AND golesvis IS NULL',
            [eqLoc, eqVis, golesLoc, golesVis, fechaHora]);

        //Update predictions
        const predictions = await client.query('SELECT * FROM Prediccion WHERE eqloc = $1 AND eqvis = $2 AND fechahora = $3', [eqLoc, eqVis, fechaHora]);
        for(let i = 0; i < predictions.rows.length; i++){
            const prediction = predictions.rows[i];
            let points = 0;
            if(prediction.golesloc === golesLoc && prediction.golesvis === golesVis){
                points = 3;
            }else if((prediction.golesloc > prediction.golesvis && golesLoc > golesVis) || (prediction.golesloc < prediction.golesvis && golesLoc < golesVis) || (prediction.golesloc === prediction.golesvis && golesLoc === golesVis)){
                points = 1;
            }
            await client.query('UPDATE Prediccion SET puntosotorgados = $1 WHERE ciAlumno = $2 AND eqloc = $3 AND eqvis = $4 AND fechahora = $5', [points, prediction.cialumno, eqLoc, eqVis, fechaHora]);
            await client.query('UPDATE Alumno SET totalpoints = totalpoints + $1 WHERE ci = $2', [points, prediction.cialumno]);
        }
        res.status(200).send('Partido actualizado');
    } catch (error) {
        console.error('Error al actualizar el partido:', error);
        res.status(500).send('Error al actualizar el partido');
    }
};