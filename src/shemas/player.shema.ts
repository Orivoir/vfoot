import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Player as PresetPlayer } from './presets/player.shema';
import {
  PlayerSkills,
  PlayerSkillsSchema,
} from './presets/player-skills.shema';

export type PlayerDocument = Player & mongoose.Document;

@Schema()
export class Player {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: PresetPlayer.name,
  })
  @Type(() => PresetPlayer)
  presetPlayer: PresetPlayer;

  @Prop({ required: true, default: 100 })
  power: number;

  @Prop({ required: true, default: 300 })
  salary: number;

  @Prop({ required: true, default: 7 })
  matchRemaining: number;

  @Prop({ required: true, default: 0 })
  woundRemaining: number;

  @Prop({ required: false })
  exitAt?: number;

  @Prop({ required: true, type: PlayerSkillsSchema })
  @Type(() => PlayerSkills)
  modifier: PlayerSkills;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
