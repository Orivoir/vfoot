import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type ClubPlayerDocument = ClubPlayer & Document;

@Schema()
export class ClubPlayer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  clubName: string;

  @Prop({ required: true })
  clubNameNormalize: string;

  @Prop({ required: true })
  clubFlagId: number;
}

export const ClubPlayerSchema = SchemaFactory.createForClass(ClubPlayer);
