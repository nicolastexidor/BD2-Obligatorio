import { Request, Response } from 'express';
import client from '../config/db';
import { PartidoDTO } from '../dto/partido.dto';

export const addPartido = async (req: Request, res: Response): Promise<void> => {
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadioId } = req.body;
    const partido = new PartidoDTO(eqLoc, eqVis, fechaHora, golesLoc, golesVis, estadioId);
    try {
        const result = await client.query(
            'INSERT INTO Partido (eqloc, eqvis, golesloc, golesvis, fechahora, estadio) VALUES ($1, $2, $3, $4, $5, $6)',
            [partido.eqloc, partido.eqvis, partido.golesloc, partido.golesvis, partido.fechahora, partido.estadioId]);
        res.status(201).send('Partido creado');
    } catch (error) {
        console.error('Error al crear el partido:', error);
        res.status(500).send('Error al crear el partido');
    }
}

export const getPartidos = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await client.query('SELECT * FROM Partido ORDER BY FechaHora');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        res.status(500).send('Error al obtener los partidos');
    }
};

export const updatePartido = async (req: Request, res: Response): Promise<void> => {
    const { eqLoc, eqVis, golesLoc, golesVis, fechaHora, estadio } = req.body;
    try {
        const partido = new PartidoDTO(eqLoc, eqVis, fechaHora, golesLoc, golesVis, estadio);
        const result = await client.query(
            'UPDATE Partido SET golesloc = $3, golesvis = $4 WHERE eqloc = $1 AND eqvis = $2 AND fechahora = $5 AND golesloc IS NULL AND golesvis IS NULL',
            [eqLoc, eqVis, golesLoc, golesVis, fechaHora]);
        
        if(result.rowCount === 0){
            res.status(400).send('No se puede actualizar el partido, no existe o ya tiene resultado');
            return;
        }
        //Update predictions
        const predictions = await client.query('SELECT * FROM Prediccion WHERE eqloc = $1 AND eqvis = $2 AND fechahora = $3', [eqLoc, eqVis, fechaHora]);
        for(let i = 0; i < predictions.rows.length; i++){
            const prediction = predictions.rows[i];
            let points = 0;
            if(prediction.golesloc === golesLoc && prediction.golesvis === golesVis){
                points = 4;
            }else if((prediction.golesloc > prediction.golesvis && golesLoc > golesVis) || (prediction.golesloc < prediction.golesvis && golesLoc < golesVis) || (prediction.golesloc === prediction.golesvis && golesLoc === golesVis)){
                points = 2;
            }
            await client.query('UPDATE Prediccion SET puntosotorgados = $1 WHERE ciAlumno = $2 AND eqloc = $3 AND eqvis = $4 AND fechahora = $5', [points, prediction.cialumno, eqLoc, eqVis, fechaHora]);
            await client.query('UPDATE Alumno SET puntos = puntos + $1 WHERE ci = $2', [points, prediction.cialumno]);
        }
        res.status(200).send('Partido actualizado');
    } catch (error) {
        console.error('Error al actualizar el partido:', error);
        res.status(500).send('Error al actualizar el partido');
    }
};