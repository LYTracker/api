import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleInit() {
    this.$connect();
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
