import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from './types'

const JWT_SECRET = 'mercado_secreto_123'

export function jwtGuard (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Token nao fornecido' })
  }

  const token = authHeader.split (' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
  

    (req as any).user = decoded


  next()

} catch {
    res.status(403).json({ error: 'Token inválido ou expirado' })
}
 }