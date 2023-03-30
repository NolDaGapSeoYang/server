import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMetaDataInput {
  @Field(() => String)
  @IsString()
  key: string;

  @Field(() => String)
  @IsString()
  value: string;
}

@InputType()
export class CreatePlaceInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => [String])
  @IsString()
  thumbnails: string[];

  @Field(() => [String])
  @IsString()
  images: string[];

  @Field(() => Boolean)
  @IsBoolean()
  parkingAvailable: boolean;

  @Field(() => Number)
  @IsNumber()
  parkingCount: number;

  @Field(() => Boolean)
  @IsBoolean()
  wheelChairRentable: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  elevatorAvailable: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  toiletAvailable: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  pathExists: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  pathDescription?: string;

  @Field(() => Number)
  @IsNumber()
  latitude: number;

  @Field(() => Number)
  @IsNumber()
  longitude: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  etc?: string;

  @Field(() => String)
  @IsString()
  basicInfo: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => Boolean)
  @IsBoolean()
  needCompanion: boolean;

  @Field(() => [CreateMetaDataInput])
  metadata: CreateMetaDataInput[];
}

@InputType()
export class CreatePlacesInput {
  @Field(() => [CreatePlaceInput])
  places: CreatePlaceInput[];
}
