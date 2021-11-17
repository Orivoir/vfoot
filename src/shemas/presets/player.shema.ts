import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { PlayerSkills, PlayerSkillsSchema } from './player-skills.shema';
import { PlayerTeam, PlayerTeamSchema } from './player-team.shema';

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

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
