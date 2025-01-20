import { Request, Response } from "express";
import { createAccessToken } from "../../service/auth/auth_service";

// Controlador para gerar o token de acesso
export const generateAccessToken = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const tokenPayload = await createAccessToken(email, password);
    res.status(200).json({ token: tokenPayload });
  } catch (error) {
    res.status(400).json({ mensagem: "Não foi possível criar o token." });
  }
};
