import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DbController } from './db/db.controller';
import { PrismaService } from './prisma/prisma.service';
import { DbService } from './db/db.service';

@Module({
  imports: [DbModule],
  controllers: [AppController, DbController],
  providers: [AppService,PrismaService, DbService],
})
export class AppModule {}
