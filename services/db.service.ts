import fs from 'fs/promises';
import path from 'path';
import { User } from '@/lib/auth/definitions';

const filePath = path.join(process.cwd(), '/data/users.json');

export const dbService = {
  async getAllUsers(): Promise<any[]> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  },

  async saveUser(newUser: any) {
    const users = await this.getAllUsers();
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  },

  async getUserByEmail(email: string) {
    const users = await this.getAllUsers();
    return users.find(u => u.email === email);
  },

  async getUserById (id: string) {
    const users = await this.getAllUsers();
    return users.find(user => user.id === id);
  },

  async updateUser (updatedUser:User){
    const users = await this.getAllUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);

    if (index === -1) {
      return null
    }

    users[index] = { ...users[index], ...updatedUser };

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  }
};