import { User } from '@prisma/client';

export type IActiveUser = Pick<User, 'id' | 'username'>;
