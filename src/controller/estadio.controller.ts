import { Request, Response } from 'express';
import client from '../config/db';
import { EstadioDTO } from '../dto/estadio.dto';

export const getEstadios = async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM Estadio');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los estadios:', error);
        res.status(500).send('Error al obtener los estadios');
    }
}

export const addEstadio = async (req: Request, res: Response) => {
    try {
        const { id, nombre, ciudad, estado } = req.body;
        const estadioData = new EstadioDTO(id, nombre, ciudad, estado);
        const result = await client.query('INSERT INTO Estadio (id, nombre, ciudad, estado) VALUES ($1, $2, $3, $4)', [estadioData.id, estadioData.nombre, estadioData.ciudad, estadioData.estado]);
        res.status(201).send('Estadio creado');
    } catch (error) {
        console.error('Error al crear el estadio:', error);
        res.status(500).send('Error al crear el estadio');
    }
}