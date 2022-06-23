import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from './entities/record.model';

@Module({
  imports: [SequelizeModule.forFeature([Record])],
  exports: [SequelizeModule, RecordsService],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
