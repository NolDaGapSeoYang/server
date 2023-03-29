import { Query, Resolver } from '@nestjs/graphql';

import { PlaceService } from './place.service';
import { Place } from './schemas';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => [Place])
  async places(): Promise<Place[]> {
    return this.placeService.getAll();
  }
}
