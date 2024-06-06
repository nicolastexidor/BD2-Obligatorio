import { Request, Response } from 'express';
import client from '../config/db';
import { EquipoDTO } from '../dto/equipo.dto';
import { INVALID_TOKEN_ERROR, USER_NOT_AUTHORIZED_ERROR } from '../constants/errors';

export const addEquipo = async (req: Request, res: Response): Promise<void> => {
    const ci = req.ci;
    if (!ci) {
        res.status(401).send({message: INVALID_TOKEN_ERROR});
        return;
    }
    const { nombre, grupo } = req.body;
    try {
        const admin = await client.query('SELECT * FROM Administrador WHERE ci = $1', [ci]);
        if(admin.rows.length === 0){
            res.status(401).send({message: USER_NOT_AUTHORIZED_ERROR});
            return;
        }
        const equipo = new EquipoDTO(nombre, grupo);
        const result = await client.query(
            'INSERT INTO Equipo (nombre, grupo) VALUES ($1, $2)',
            [equipo.nombre, equipo.grupo]
        );
    } catch (error) {
        console.error('Error al crear el partido:', error);
        res.status(500).send('Error al crear el partido');
    }
}