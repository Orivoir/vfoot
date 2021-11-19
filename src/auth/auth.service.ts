import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { Document, Model } from 'mongoose';
import { HelperService } from 'src/helper/helper.service';
import {
  PresetPlayer,
  PresetPlayerDocument,
} from 'src/shemas/presets/player.shema';
import { Player, PlayerDocument } from 'src/shemas/player.shema';
import { User, UserDocument } from 'src/shemas/user.shema';
import { Team, TeamDocument } from 'src/shemas/team.shema';

@Injectable()
export class AuthService {
  private clientId?: string;
  private client: OAuth2Client;

  constructor(
    private configService: ConfigService,
    @InjectModel(PresetPlayer.name)
    private presetPlayerModel: Model<PresetPlayerDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.clientId = this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID');
    this.client = new OAuth2Client(this.clientId);
  }

  createResponse(localeUser: User & Document, googleUser: TokenPayload) {
    const {
      email,
      name,
      family_name,
      given_name,
      locale, // represent as BCP-47 Language
      picture,
      email_verified,
      exp, // timestamp (POSIX) expire token_access
    } = googleUser;

    return {
      success: true,
      user: {
        google: {
          email,
          name,
          family_name,
          given_name,
          locale,
          picture,
          email_verified,
          exp,
        },
        locale: {
          ...localeUser,
        },
      },
    };
  }

  async createDefaultPlayers(): Promise<PlayerDocument[]> {
    const presetPlayers = await this.presetPlayerModel
      .find({
        rangeRank: { $in: [HelperService.DEFAULT_TEAM_MAX_RANK_PLAYERS] },
      })
      .limit(HelperService.DEFAULT_TEAM_COUNT_PLAYERS);

    const insertedPlayers: PlayerDocument[] = await this.playerModel.insertMany(
      presetPlayers.map(
        (presetPlayer: PresetPlayerDocument): Omit<Player, '_id'> => {
          return {
            presetPlayer: presetPlayer._id,
            ...HelperService.DEFAULT_PLAYER,
          };
        },
      ),
    );

    return await Promise.all(
      insertedPlayers.map(
        (insertedPlayer: PlayerDocument): Promise<PlayerDocument> => {
          return insertedPlayer.populate({
            path: 'presetPlayer',
            populate: [{ path: 'country' }, { path: 'club' }],
          });
        },
      ),
    );
  }
  async createDefaultTeam(): Promise<TeamDocument> {
    const players = await this.createDefaultPlayers();
    const team: Omit<Team, '_id'> = {
      ...HelperService.DEFAULT_TEAM,
      players,
    };

    const insertedTeam: TeamDocument = await this.teamModel.create(team);

    return insertedTeam;
  }
  async createDefaultUser(googleId: string): Promise<UserDocument> {
    const team: TeamDocument = await this.createDefaultTeam();

    const user: Omit<User, '_id'> = {
      googleId,
      team,
    };

    const insertedUser: UserDocument = await this.userModel.create(user);

    return insertedUser;
  }

  verify(idToken: string): Promise<LoginTicket> {
    if (!this.clientId) {
      throw new RangeError('client id is not available from config service');
    }

    return this.client.verifyIdToken({
      idToken,
      audience: this.clientId,
    });
  }
}
