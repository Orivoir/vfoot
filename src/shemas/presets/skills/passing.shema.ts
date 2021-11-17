import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PassingDocument = Passing & Document;

@Schema()
export class Passing {
  @Prop({ required: true })
  longPass: number;

  @Prop({ required: true })
  shortPass: number;

  @Prop({ required: true })
  crossing: number;
}

export const PassingSchema = SchemaFactory.createForClass(Passing);
