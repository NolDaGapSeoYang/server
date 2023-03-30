import { Args, Query, Resolver } from '@nestjs/graphql';

import { PlaceConnectionArgs, PlacesConnection } from './dtos';
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
}
