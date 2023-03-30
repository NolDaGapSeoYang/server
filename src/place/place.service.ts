import { PrismaService } from 'src/prisma.service';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';

import * as places from '../assets/dummy.json';
import {
  CreatePlaceInput,
  PlaceConnectionArgs,
  PlacesConnection,
} from './dtos';
import { Place } from './schemas';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlace(input: CreatePlaceInput): Promise<Place> {
    return this.prisma.place.create({
      data: {
        ...input,
        metadata: {
          createMany: {
            data: input.metadata,
          },
        },
      },
      include: {
        metadata: true,
      },
    });
  }

  async createMany(): Promise<number> {
    for (const place of places) {
      await this.prisma.place.create({
        data: {
          ...place,
          metadata: {
            createMany: {
              data: place.metadata.map((m) => ({ key: m.tag, value: m.value })),
            },
          },
        },
      });
    }

    return places.length;
  }

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
      include: {
        metadata: true,
      },
    };

    // const nodes = await this.prisma.place.findMany({
    //   include: {
    //     metadata: true,
    //   },
    // });

    const { edges, pageInfo } = await findManyCursorConnection(
      (args) => this.prisma.place.findMany({ ...args, ...baseArgs }),
      () => this.prisma.place.count(),
      connArgs,
    );

    return {
      // @ts-expect-error type difference
      pageInfo,
      edges,
    };
  }
}
