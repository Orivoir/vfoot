import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Exclude, Type } from 'class-transformer';
import { Team } from './team.shema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  _id: mongoose.ObjectId;

  @Prop({
    required: true,
  })
  googleId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Team.name,
  })
  team: Team;

  constructor(userPartial: Partial<User>) {
    Object.assign(this, userPartial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
