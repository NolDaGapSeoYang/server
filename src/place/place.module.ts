import { PrismaService } from 'src/prisma.service';

import { Module } from '@nestjs/common';

import { PlaceResolver } from './place.resolver';
import { PlaceService } from './place.service';

@Module({
  imports: [],
  providers: [PlaceResolver, PlaceService, PrismaService],
  exports: [],
})
export class PlaceModule {}
