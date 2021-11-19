import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user.shema';
import { Team, TeamSchema } from 'src/shemas/team.shema';
import {
  PresetPlayer,
  PresetPlayerSchema,
} from 'src/shemas/presets/player.shema';
import { Player, PlayerSchema } from 'src/shemas/player.shema';
import {
  CountryPlayer,
  CountryPlayerSchema,
} from 'src/shemas/presets/country-player.shema';
import {
  ClubPlayer,
  ClubPlayerSchema,
} from 'src/shemas/presets/club-player.shema';
import { Consomable, ConsomableSchema } from 'src/shemas/presets/consomable';
import { Task, TaskSchema } from 'src/shemas/task.shema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: PresetPlayer.name,
        schema: PresetPlayerSchema,
      },
      {
        name: CountryPlayer.name,
        schema: CountryPlayerSchema,
      },
      {
        name: ClubPlayer.name,
        schema: ClubPlayerSchema,
      },
      {
        name: Player.name,
        schema: PlayerSchema,
      },
      {
        name: Consomable.name,
        schema: ConsomableSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
