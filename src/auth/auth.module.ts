import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user.shema';
import { Team, TeamSchema } from 'src/shemas/team.shema';
import { Player, PlayerSchema } from 'src/shemas/presets/player.shema';

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
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
