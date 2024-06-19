import { Request, Response } from 'express';
import client from '../config/db';
import { EquipoDTO } from '../dto/equipo.dto';

export const addEquipo = async (req: Request, res: Response): Promise<void> => {
    const { nombre, grupo } = req.body;
    const equipo = new EquipoDTO(nombre, grupo);
    try {
        const result = await client.query(
            'INSERT INTO Equipo (nombre, grupo) VALUES ($1, $2)',
            [equipo.nombre, equipo.grupo]
        );
        res.status(201).send('Equipo creado');
    } catch (error) {
        console.error('Error al crear el partido:', error);
        res.status(500).send('Error al crear el partido');
    }
}

export const getEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await client.query('SELECT * FROM Equipo');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        res.status(500).send('Error al obtener los partidos');
    }
}