import { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../../service/auth/auth_service";

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  if (authorization && validateAccessToken(authorization)) {
    return next();  // Passa o controle para o próximo middleware ou rota
  }
  res.sendStatus(401);  // Envia o status 401, sem retorno explícito
};


