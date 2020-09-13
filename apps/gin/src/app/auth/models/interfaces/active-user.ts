import { User } from '@prisma/client';

export type IActiveUser = Omit<User, 'password'>;
