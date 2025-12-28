import { LoginFormValues, RegisterFormValues } from '@/lib/auth/definitions';
import { dbService } from '@/services/db.service';
import bcrypt from 'bcryptjs';

export const authService = {

  async register(data: RegisterFormValues) {
    const existingUser = await dbService.getUserByEmail(data.email);
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
    const user = await dbService.getUserByEmail(credentials.email);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) return null;
    return { id: user.id, name: user.name, email: user.email };
  },

  async update(session: any, updates: any) {
    const { userId } = session;
    const user = await dbService.getUserById(userId);

    if (!user) throw new Error("Usuario no encontrado");

    // 1. Si cambia el email, verificar disponibilidad
    if (updates.email && updates.email !== user.email) {
      const exists = await dbService.getUserByEmail(updates.email);
      if (exists) throw new Error("El email ya está registrado por otro usuario");
    }

    // 2. Si cambia la contraseña, aplicar HASH
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    
    delete updates.id

    // 3. Unir datos antiguos con nuevos
    const updatedUser = { ...user, ...updates };
    
    // 4. Guardar en JSON
    await dbService.updateUser(updatedUser);

    // 5. Retornar usuario sin la contraseña por seguridad
    const { password, ...safeUser } = updatedUser;
    return safeUser;
  }

  
};