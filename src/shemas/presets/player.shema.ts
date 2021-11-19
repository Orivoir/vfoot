import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { PlayerSkills, PlayerSkillsSchema } from './player-skills.shema';
import { PlayerTeam, PlayerTeamSchema } from './player-team.shema';
import { CountryPlayer } from './country-player.shema';
import { ClubPlayer } from './club-player.shema';

export type PlayerFootPreset = 'Left' | 'Right';
export type PlayerPositionPreset =
  | 'GK'
  | 'RB'
  | 'RWB'
  | 'LB'
  | 'LWB'
  | 'CB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LM'
  | 'LW'
  | 'LF'
  | 'RM'
  | 'RW'
  | 'RF'
  | 'CF'
  | 'ST';

export type PresetPlayerDocument = PresetPlayer & mongoose.Document;

@Schema()
export class PresetPlayer {
  _id: mongoose.ObjectId;

  @Prop({ required: true, unique: true })
  id: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: CountryPlayer.name,
  })
  country: CountryPlayer;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: ClubPlayer.name,
  })
  club: ClubPlayer;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, type: [Number] })
  rangeRank: [number, number];

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true, type: String })
  preferredFoot: PlayerFootPreset;

  @Prop({ required: true })
  bornAt?: number;

  @Prop({ required: true, type: [String] })
  preferredPositions: PlayerPositionPreset[];

  @Prop({ required: false })
  joinedClubAtYear?: number;

  @Prop({ required: true, type: PlayerSkillsSchema })
  @Type(() => PlayerSkills)
  skills: PlayerSkills;

  @Prop({ required: true, type: [PlayerTeamSchema] })
  teams: PlayerTeam[];

  constructor(playerPartial: Partial<PresetPlayer>) {
    Object.assign(this, playerPartial);
  }
}

export const PresetPlayerSchema = SchemaFactory.createForClass(PresetPlayer);
