import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Redirect,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

import { PrismaService } from '../core/prisma.service';
import { User } from '../auth/decorators/user.decorator';
import { ActiveUser } from '../auth/models/active-user';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  public async listLobbies() {
    const games = await this.prisma.game.findMany({
      select: { name: true, id: true, users: true },
    });

    const lobbies = games.map((game) => ({
      name: game.name,
      id: game.id,
      playerCount: game.users.length,
    }));

    return lobbies;
  }

  @Get(':id')
  public async lobbyDetails(@Param('id') gameId: string) {
    const lobby = await this.prisma.game.findOne({
      where: { id: gameId },
      select: {
        name: true,
        users: { select: { username: true, id: true, hostedGameId: true } },
      },
    });

    return {
      ...lobby,
      users: lobby.users.map(({ id, hostedGameId, username }) => ({
        id,
        username,
        host: !!hostedGameId,
      })),
    };
  }

  @Post()
  public async addLobby(@User() user: ActiveUser) {
    await this.deleteLobby(user);
    const { username } = user;

    const lobby = await this.prisma.game.create({
      data: {
        name: username,
        host: { connect: { username } },
        users: { connect: { username } },
      },
      select: { id: true },
    });

    await this.prisma.user.update({
      where: { username },
      data: { gameHand: { set: [] }, gameScore: { set: 0 } },
    });

    return { lobby };
  }

  @Post(':id/join')
  public async joinLobby(@User() user: ActiveUser, @Param('id') id: string) {
    await this.deleteLobby(user);
    const lobby = await this.prisma.game.findOne({
      where: { id },
    });

    if (lobby) {
      await this.prisma.user.update({
        where: { username: user.username },
        data: {
          game: { connect: { id } },
          gameHand: { set: [] },
          gameScore: { set: 0 },
        },
      });

      return { message: `${user.username} has joined the lobby` };
    }

    throw new NotFoundException('The lobby is a lie and does not exist');
  }

  @Post('/leave')
  @Redirect()
  public async leaveLobby(@User() user: ActiveUser, @Res() res: Response) {
    if (!user.hostedGameId) {
      await this.prisma.user.update({
        where: { username: user.username },
        data: { game: { disconnect: true } },
      });

      return { message: 'You have been disconnected' };
    }

    return this.deleteLobby(user);
  }

  @Delete()
  public async deleteLobby(@User() { hostedGameId }: ActiveUser) {
    if (hostedGameId) {
      await this.prisma.user.updateMany({
        where: { gameId: hostedGameId },
        data: {
          gameHand: { set: [] },
          gameScore: { set: 0 },
        },
      });

      const users = await this.prisma.user.findMany({
        where: { gameId: hostedGameId },
        select: { id: true },
      });

      if (users.length) {
        await this.prisma.game.update({
          where: { id: hostedGameId },
          data: {
            users: { disconnect: users },
          },
        });
      }

      await this.prisma.game.delete({ where: { id: hostedGameId } });

      return { message: 'You have obliterated the lobby' };
    }

    return { message: 'The lobby is a lie' };
  }
}
