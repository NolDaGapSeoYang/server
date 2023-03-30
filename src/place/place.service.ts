import { PrismaService } from 'src/prisma.service';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';

import { PlaceConnectionArgs, PlacesConnection } from './dtos';
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
          ...(categories ? [{ category: { in: categories } }] : []),
          {
            needCompanion,
          },
          ...(parkingAvailable !== undefined ? [{ parkingAvailable }] : []),
          ...(wheelChairRentable !== undefined ? [{ wheelChairRentable }] : []),
          ...(elevatorAvailable !== undefined ? [{ elevatorAvailable }] : []),
          ...(toiletAvailable !== undefined ? [{ toiletAvailable }] : []),
          ...(pathExists !== undefined ? [{ pathExists }] : []),
        ],
      },
    };

    const count = await this.prisma.place.count({
      ...baseArgs,
    });

    // const nodes = await this.prisma.place.findMany({
    //   include: {
    //     metadata: true,
    //   },
    // });

    const { edges, pageInfo } = await findManyCursorConnection(
      (args) =>
        this.prisma.place.findMany({
          ...args,
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
