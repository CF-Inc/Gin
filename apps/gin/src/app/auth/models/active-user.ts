import { User } from '@prisma/client';

export type ActiveUser = Omit<User, "password">