import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  _id: ObjectId;

  @Prop({ required: true })
  finishAt: number;

  @Prop({ unique: true })
  id: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
