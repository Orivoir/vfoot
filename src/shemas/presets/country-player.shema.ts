import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type CountryPlayerDocument = CountryPlayer & Document;

@Schema()
export class CountryPlayer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  countryName: string;

  @Prop({ required: true })
  countryNameNormalize: string;

  @Prop({ required: true })
  countryFlagId: number;
}

export const CountryPlayerSchema = SchemaFactory.createForClass(CountryPlayer);
