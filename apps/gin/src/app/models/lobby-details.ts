import { User } from '@prisma/client';

export interface ILobbyDetails {
  name: string;
  users: (Pick<User, 'id' | 'username'> & { host: boolean })[];
}
