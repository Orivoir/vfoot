import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MentalDocument = Mental & Document;

@Schema()
export class Mental {
  @Prop({ required: true })
  composure: number;

  @Prop({ required: true })
  vision: number;

  @Prop({ required: true })
  interceptions: number;

  @Prop({ required: true })
  attackPosition: number;

  @Prop({ required: true })
  reactions: number;

  @Prop({ required: true })
  aggression: number;
}

export const MentalSchema = SchemaFactory.createForClass(Mental);
