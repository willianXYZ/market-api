import { Router, Request, Response } from "express";
import { AuthService } from "./auth.services";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post(`/register`, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: `Preencha todos os campos` });
    }

    const result = await authService.register(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(409).json({ error: error.message });
  }
});

authRouter.post(`/login`, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: `Informe email e senha` });
    }
    
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});
