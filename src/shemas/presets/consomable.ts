import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
export type ConsomableDocument = Consomable & Document;

@Schema()
export class Consomable {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: String })
  type: 'single' | 'group';
}

export const ConsomableSchema = SchemaFactory.createForClass(Consomable);
