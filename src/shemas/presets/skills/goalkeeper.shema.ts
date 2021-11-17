import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GoalkeeperDocument = Goalkeeper & Document;

@Schema()
export class Goalkeeper {
  @Prop({ required: true })
  reflexes: number;

  @Prop({ required: true })
  kicking: number;

  @Prop({ required: true })
  handling: number;

  @Prop({ required: true })
  diving: number;

  @Prop({ required: true })
  positioning: number;
}

export const GoalkeeperSchema = SchemaFactory.createForClass(Goalkeeper);
