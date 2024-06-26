import { Request, Response } from 'express';
import client from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtKey } from '../constants/constants';
import { AdministradorDTO } from '../dto/administrador.dto';
import { INVALID_CREDENTIALS_ERROR, INVALID_TOKEN_ERROR, USER_NOT_AUTHORIZED_ERROR, USER_NOT_FOUND_ERROR } from '../constants/errors';
import { RegisterAdminDTO } from '../dto/request/register.admin.dto';


export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { ci, contraseña } = req.body;
    try {
      const result = await client.query('SELECT * FROM administrador WHERE ci = $1', [ci]);
      if (result.rows.length === 0) {
        res.status(404).send({message: USER_NOT_FOUND_ERROR});
        return;
      }
      const admin: AdministradorDTO = result.rows[0];
      const validPassword = await bcrypt.compare(contraseña, admin.contraseña);
      if (validPassword) {
        const token = jwt.sign({ ci, role: 'admin' }, jwtKey);
        res.status(200).json({ message: 'Admin logueado', token });
      } else {
        res.status(401).send({message: INVALID_CREDENTIALS_ERROR});
      }
    } catch (error) {
      console.error('Error al ', error);
      res.status(500).send('Error al loguear el alumno');
    }
}

export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    const ciAdmin = req.ci;
    const { ci, nombre, contraseña } = req.body;
    const adminData = new RegisterAdminDTO(ci, nombre, contraseña);
    try {
        const hash = await bcrypt.hash(adminData.contraseña, 10);
        const result = await client.query('INSERT INTO administrador (ci, nombre, contraseña) VALUES ($1, $2, $3)', [adminData.ci, adminData.nombre, hash]);
        const token = jwt.sign({ ci, role: 'admin' }, jwtKey);
        res.status(201).send({message: 'Admin creado', token});
    } catch (error) {
        console.error('Error al crear el admin:', error);
        res.status(500).send('Error al crear el admin');
    }
}