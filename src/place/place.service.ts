import { PrismaService } from 'src/prisma.service';

import { Injectable } from '@nestjs/common';

import { Place } from './schemas';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Place[]> {
    return this.prisma.place.findMany({
      include: {
        metadata: true,
      },
    });
  }
}
