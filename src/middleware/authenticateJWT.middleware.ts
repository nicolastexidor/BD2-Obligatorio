import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AlumnoDTO } from '../dto/alumno.dto';
import { jwtKey } from '../constants/constants';
import { INVALID_TOKEN_ERROR } from '../constants/errors';

interface ExtendedJwtPayload extends JwtPayload {
  role?: string;
}


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtKey, (err, payload) => {
      if (err || !payload) {
        return res.sendStatus(403);
      }
      req.ci = (payload as AlumnoDTO).ci as string;
      req.role = (payload as ExtendedJwtPayload).role as string;
      if (!req.ci) {
        return res.status(401).send({message: INVALID_TOKEN_ERROR});
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};