import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type ClubPlayerDocument = ClubPlayer & Document;

@Schema()
export class ClubPlayer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: number; // uniq club id use or build club logo image URL
}

export const ClubPlayerSchema = SchemaFactory.createForClass(ClubPlayer);
