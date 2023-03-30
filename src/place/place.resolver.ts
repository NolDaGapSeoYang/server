import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PlaceConnectionArgs, PlaceCountInput, PlacesConnection } from './dtos';
import { PlaceService } from './place.service';
import { Place } from './schemas';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => PlacesConnection)
  async places(
    @Args() connectionArgs: PlaceConnectionArgs,
  ): Promise<PlacesConnection> {
    return this.placeService.paginatePlaces(connectionArgs);
  }

  @Query(() => Place, { nullable: true })
  async place(@Args('id') id: string): Promise<Place | null> {
    return this.placeService.findOneById(id);
  }

  @Query(() => Number)
  async placeCount(@Args('input') input: PlaceCountInput): Promise<number> {
    return this.placeService.countPlaces(input);
  }

  @ResolveField(() => String, { nullable: true })
  async tel(@Parent() parent: Place) {
    const metadata = parent.metadata;
    if (!metadata) return null;
    const telMetadata = metadata.find((metadata) => metadata.key === '문의');

    if (!telMetadata) return null;
    return telMetadata.value;
  }
}
