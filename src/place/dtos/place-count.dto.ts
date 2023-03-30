import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PlaceCountInput {
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  parkingAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  wheelChairRentable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  elevatorAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  toiletAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  pathExists?: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  needCompanion: boolean;
}
