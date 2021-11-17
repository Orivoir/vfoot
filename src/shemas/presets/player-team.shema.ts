import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerTeamDocument = PlayerTeam & Document;

@Schema()
export class PlayerTeam {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  kitNumber: number;

  @Prop({ required: false })
  joinedClubAt?: number;
}

export const PlayerTeamSchema = SchemaFactory.createForClass(PlayerTeam);
