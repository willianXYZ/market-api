import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, JwtPayload } from "../types";

const users: User[] = [];

const JWT_SECRET = `mercado_secreto_123`;
const SALT_ROUNDS = 10;

export class AuthService {
  async register(name: string, email: string, password: string) {
   
    const exists = users.find((u: User) => u.email === email);
    
    if (exists) throw new Error("Email já Cadatrado");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
   
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(user);

    return { token: this.generateToken(user), name: user.name  };
    
  }

  async login (email: string, password: string) {;
    const user = users.find(u => u.email === email);
     if (!user) throw new Error (`Credencias Inválidas`);

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error (`Credencias Inválidas`);

      return { token: this.generateToken(user), name: user.name }
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = { userId: user.id, email: user.email };
     return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
  
}
