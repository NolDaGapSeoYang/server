import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Connection, Edge } from 'graphql-relay';
import { ConnectionArgs, PageInfo } from 'nestjs-graphql-relay';

import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

import { Place } from '../schemas';

@InputType()
export class CoordinateInput {
  @Field(() => Number)
  @IsNumber()
  latitude: number;

  @Field(() => Number)
  @IsNumber()
  longitude: number;
}

@InputType()
export class FacilityInput {
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
}

@ArgsType()
export class PlaceConnectionArgs extends ConnectionArgs {
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

  @Field(() => CoordinateInput, { nullable: true })
  @IsOptional()
  coordinates?: CoordinateInput;
}

@ObjectType({ isAbstract: true })
export abstract class PlaceEdge implements Edge<Place> {
  @Field(() => Place)
  node: Place;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class PlacesConnection implements Connection<Place> {
  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [PlaceEdge])
  edges: PlaceEdge[];

  @Field(() => Number)
  totalCount: number;
}
