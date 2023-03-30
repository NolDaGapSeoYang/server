import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Place {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => [String])
  thumbnails: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => Boolean)
  parkingAvailable: boolean;

  @Field(() => Number)
  parkingCount: number;

  @Field(() => Boolean)
  wheelChairRentable: boolean;

  @Field(() => Boolean)
  elevatorAvailable: boolean;

  @Field(() => Boolean)
  toiletAvailable: boolean;

  @Field(() => Boolean)
  pathExists: boolean;

  @Field(() => String, { nullable: true })
  pathDescription?: string;

  @Field(() => Number)
  latitude: number;

  @Field(() => Number)
  longitude: number;

  @Field(() => String, { nullable: true })
  etc?: string;

  @Field(() => String)
  basicInfo: string;

  @Field(() => String)
  category: string;

  @Field(() => Boolean)
  needCompanion: boolean;

  @Field(() => Number)
  distance: number;

  @Field(() => [Metadata])
  metadata: Metadata[];
}

@ObjectType()
export class Metadata {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
