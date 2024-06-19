import { Request, Response, NextFunction } from 'express';
import client from '../config/db';
import { USER_NOT_AUTHORIZED_ERROR } from '../constants/errors';

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const admin = await client.query('SELECT * FROM Administrador WHERE ci = $1', [req.ci]);
    if(admin.rows.length === 0){
        res.status(401).send({message: USER_NOT_AUTHORIZED_ERROR});
        return;
    }
    next();
};