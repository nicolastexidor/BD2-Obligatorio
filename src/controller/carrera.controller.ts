import { Request, Response } from 'express';
import client from '../config/db';
import { CreateCarreraDTO } from '../dto/request/create.carrera.dto';

export const getCarreras = async (req: Request, res: Response) => {
    try {
        const result = await client.query('SELECT * FROM Carrera');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener las carreras:', error);
        res.status(500).send('Error al obtener las carreras');
    }
}

export const addCarrera = async (req: Request, res: Response) => {
    try {
        const { id, nombre } = req.body;
        const carreraData = new CreateCarreraDTO(id, nombre);
        const result = await client.query('INSERT INTO Carrera (id, nombre) VALUES ($1, $2)', [carreraData.id, carreraData.nombre]);
        res.status(201).send('Carrera creada');
    } catch (error) {
        console.error('Error al crear la carrera:', error);
        res.status(500).send('Error al crear la carrera');
    }
}