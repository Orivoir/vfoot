import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Player } from './player.shema';
import { Consomable } from './presets/consomable';
import { Task } from './task.shema';

export type TeamDocument = Team & mongoose.Document;

@Schema()
export class Team {
  _id: mongoose.ObjectId;

  @Prop({
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Player.name,
      },
    ],
  })
  players: Player[];

  @Prop({
    required: true,
    default: [],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Consomable.name,
      },
    ],
  })
  consomables: Consomable[];

  @Prop({
    required: true,
    default: [],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Task.name,
      },
    ],
  })
  tasks: Task[];

  @Prop({ required: false })
  name?: string;

  @Prop({
    required: true,
    default: 2000,
  })
  amount: number;

  @Prop({
    required: true,
    default: 50,
  })
  popularity: number;

  @Prop({
    required: true,
    default: 0,
  })
  stadiumLevel: number;

  @Prop({
    required: true,
    default: 0,
  })
  recrutingCenterLevel: number;

  constructor(teamPartial: Partial<Team>) {
    Object.assign(this, teamPartial);
  }
}

export const TeamSchema = SchemaFactory.createForClass(Team);
