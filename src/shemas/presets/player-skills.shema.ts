import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';

import { Ballskills, BallskillsSchema } from './skills/ballskills.shema';
import { Defence, DefenceSchema } from './skills/defence.shema';
import { Goalkeeper, GoalkeeperSchema } from './skills/goalkeeper.shema';
import { Mental, MentalSchema } from './skills/mental.shema';
import { Passing, PassingSchema } from './skills/passing.shema';
import { Physical, PhysicalSchema } from './skills/physical.shema';
import { Shooting, ShootingSchema } from './skills/shooting.shema';

export type PlayerSkillsDocument = PlayerSkills & Document;

@Schema()
export class PlayerSkills {
  @Prop({ required: true, type: BallskillsSchema })
  @Type(() => Ballskills)
  ballSkills: Ballskills;

  @Prop({ required: true, type: DefenceSchema })
  @Type(() => Defence)
  defence: Defence;

  @Prop({ required: true, type: GoalkeeperSchema })
  @Type(() => Goalkeeper)
  goalkeeper: Goalkeeper;

  @Prop({ required: true, type: MentalSchema })
  @Type(() => Mental)
  mental: Mental;

  @Prop({ required: true, type: PassingSchema })
  @Type(() => Passing)
  passing: Passing;

  @Prop({ required: true, type: PhysicalSchema })
  @Type(() => Physical)
  physical: Physical;

  @Prop({ required: true, type: ShootingSchema })
  @Type(() => Shooting)
  shooting: Shooting;
}

export const PlayerSkillsSchema = SchemaFactory.createForClass(PlayerSkills);
