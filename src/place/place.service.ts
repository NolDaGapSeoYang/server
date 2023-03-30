import { PrismaService } from 'src/prisma.service';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';

import { PlaceConnectionArgs, PlaceCountInput, PlacesConnection } from './dtos';
import { Place } from './schemas';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<Place | null> {
    return this.prisma.place.findUnique({
      where: {
        id,
      },
      include: {
        metadata: true,
      },
    });
  }

  async countPlaces(input: PlaceCountInput): Promise<number> {
    const {
      categories,
      parkingAvailable,
      wheelChairRentable,
      elevatorAvailable,
      toiletAvailable,
      pathExists,
      needCompanion,
    } = input;

    const baseArgs = {
      where: {
        AND: [
          ...(categories && categories.length > 0
            ? [{ category: { in: categories } }]
            : []),
          {
            needCompanion,
          },
          ...(parkingAvailable ? [{ parkingAvailable }] : []),
          ...(wheelChairRentable ? [{ wheelChairRentable }] : []),
          ...(elevatorAvailable ? [{ elevatorAvailable }] : []),
          ...(toiletAvailable ? [{ toiletAvailable }] : []),
          ...(pathExists ? [{ pathExists }] : []),
        ],
      },
    };

    const count = await this.prisma.place.count({
      ...baseArgs,
    });

    return count;
  }

  async paginatePlaces(args: PlaceConnectionArgs): Promise<PlacesConnection> {
    const {
      categories,
      parkingAvailable,
      wheelChairRentable,
      elevatorAvailable,
      toiletAvailable,
      pathExists,
      needCompanion,
      coordinates,
      ...connArgs
    } = args;

    const baseArgs = {
      where: {
        AND: [
          ...(categories && categories.length > 0
            ? [{ category: { in: categories } }]
            : []),
          {
            needCompanion,
          },
          ...(parkingAvailable ? [{ parkingAvailable }] : []),
          ...(wheelChairRentable ? [{ wheelChairRentable }] : []),
          ...(elevatorAvailable ? [{ elevatorAvailable }] : []),
          ...(toiletAvailable ? [{ toiletAvailable }] : []),
          ...(pathExists ? [{ pathExists }] : []),
        ],
      },
    };

    const count = await this.prisma.place.count({
      ...baseArgs,
    });

    const { edges, pageInfo } = await findManyCursorConnection(
      (args) =>
        this.prisma.place.findMany({
          ...args,
          orderBy: {
            ...(coordinates ? { distance: 'asc' } : { facilityCount: 'desc' }),
          },
          ...baseArgs,
          ...{
            include: {
              metadata: true,
            },
          },
        }),
      () => this.prisma.place.count(),
      connArgs,
    );

    return {
      // @ts-expect-error type difference
      pageInfo,
      edges,
      totalCount: count,
    };
  }
}
