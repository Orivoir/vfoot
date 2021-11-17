import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DefenceDocument = Defence & Document;

@Schema()
export class Defence {
  @Prop({ required: true })
  standTackle: number;

  @Prop({ required: true })
  slideTackle: number;

  @Prop({ required: true })
  marking: number;
}

export const DefenceSchema = SchemaFactory.createForClass(Defence);
