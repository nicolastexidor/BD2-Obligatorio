import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AlumnoDTO } from '../dto/alumno.dto';
import { jwtKey } from '../constants/constants';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtKey, (err, user) => {
      if (err || !user) {
        return res.sendStatus(403);
      }
      req.ci = (user as AlumnoDTO).ci as string;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
