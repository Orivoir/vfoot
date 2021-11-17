import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhysicalDocument = Physical & Document;

@Schema()
export class Physical {
  @Prop({ required: true })
  jumping: number;

  @Prop({ required: true })
  agility: number;

  @Prop({ required: true })
  sprintSpeed: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  strength: number;

  @Prop({ required: true })
  stamina: number;

  @Prop({ required: true })
  acceleration: number;
}

export const PhysicalSchema = SchemaFactory.createForClass(Physical);
