import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type CountryPlayerDocument = CountryPlayer & Document;

@Schema()
export class CountryPlayer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string; // original country in english lang e.g: "French"

  @Prop({ required: true })
  id: number; // uniq country id use for build country flag image URL
}

export const CountryPlayerSchema = SchemaFactory.createForClass(CountryPlayer);
