import { LoginFormValues, RegisterFormValues } from '@/lib/auth/definitions';
import { dbService } from '@/services/db.services';
import bcrypt from 'bcryptjs';

export const authService = {

  async register(data: RegisterFormValues) {
    const existingUser = await dbService.findUserByEmail(data.email);
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    await dbService.saveUser(newUser);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  },

  async login(credentials: LoginFormValues) {
    const user = await dbService.findUserByEmail(credentials.email);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) return null;
    return { id: user.id, name: user.name, email: user.email };
  }

  
};