import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShootingDocument = Shooting & Document;

@Schema()
export class Shooting {
  @Prop({ required: true })
  volleys: number;

  @Prop({ required: true })
  penalties: number;

  @Prop({ required: true })
  freeKickAccuracy: number;

  @Prop({ required: true })
  curve: number;

  @Prop({ required: true })
  longShot: number;

  @Prop({ required: true })
  finishing: number;

  @Prop({ required: true })
  shotPower: number;

  @Prop({ required: true })
  heading: number;
}

export const ShootingSchema = SchemaFactory.createForClass(Shooting);
