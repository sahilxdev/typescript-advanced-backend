import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  private users: Map<string, { password: string; id: number }> = new Map();

  async register(email: string, password: string): Promise<string> {
    if (this.users.has(email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = this.users.size + 1;
    this.users.set(email, { password: hashedPassword, id });

    return this.generateToken(email, id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = this.users.get(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return this.generateToken(email, user.id);
  }

  private generateToken(email: string, id: number): string {
    return jwt.sign({ email, id }, JWT_SECRET, { expiresIn: '24h' });
  }
}
