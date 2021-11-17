import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BallskillsDocument = Ballskills & Document;

@Schema()
export class Ballskills {
  @Prop({ required: true })
  ballControl: number;

  @Prop({ required: true })
  dribbling: number;
}

export const BallskillsSchema = SchemaFactory.createForClass(Ballskills);
