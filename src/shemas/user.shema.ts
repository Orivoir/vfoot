import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Team } from './team.shema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop({
    required: true,
  })
  googleId: string;

  @Prop({
    required: true,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Team.name,
    },
  })
  @Type(() => Team)
  team: Team;
}

export const UserSchema = SchemaFactory.createForClass(User);
