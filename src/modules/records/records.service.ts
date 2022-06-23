import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.model';
import * as moment from 'moment';
import { Op } from 'sequelize';
@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record) private recordModel: typeof Record) {}

  async create(createRecordDto: CreateRecordDto, id: number) {
    const checkIn = await this.splitTime(
      `${moment().format('YYYY-MM-DD')} 06:00:00`,
      Number(process.env.DURATION_IN),
      moment().format('YYYY-MM-DD HH:mm A'),
    );
    const checkOut = await this.splitTime(
      `${moment().format('YYYY-MM-DD')} 17:00:00`,
      Number(process.env.DURATION_OUT),
      moment().format('YYYY-MM-DD HH:mm A'),
    );

    let message = '';
    const existingRecord = await this.recordModel.findOne({
      where: {
        user_id: id,
        date_in: {
          [Op.between]: [
            `${moment().format('YYYY-MM-DD')} 00:00:00`,
            `${moment().format('YYYY-MM-DD')} 23:59:59`,
          ],
        },
      },
    });
    if (!existingRecord) {
      await this.recordModel.create({
        user_id: id,
        position_in: createRecordDto.position,
        date_in: moment().format('YYYY-MM-DD HH:mm:ss'),
        status_id: checkIn ? 3 : 4,
      });
    }
    if (existingRecord && checkOut) {
      await this.recordModel.update(
        {
          position_out: createRecordDto.position,
          date_out: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          where: {
            user_id: id,
            date_in: {
              [Op.between]: [
                `${moment().format('YYYY-MM-DD')} 00:00:00`,
                `${moment().format('YYYY-MM-DD')} 23:59:59`,
              ],
            },
          },
        },
      );
    }
    if (!existingRecord) message = 'successfully absen in';
    if (existingRecord && !checkOut) message = 'cant absen out';
    if (existingRecord && checkOut) message = 'success fully absen out';
    return {
      success: true,
      message: message,
      data: {
        position: createRecordDto.position,
      },
      check_in: checkIn,
      check_out: checkOut,
    };
  }
  async detailRecordMobile(id: number) {
    const getTodayRecord = await this.recordModel.findOne({
      where: {
        user_id: id,
      },
    });
  }
  // findAll() {
  //   return `This action returns all records`;
  // }

  async findOne(id: number) {}

  private async splitTime(startTime: string, duration: number, date: string) {
    let tempTime = [];
    for (let i = 0; i < duration + 1; i++) {
      tempTime.push(
        moment(startTime).add(i, 'minutes').format('YYYY-MM-DD HH:mm A'),
      );
    }

    return tempTime.includes(date);
  }
  // update(id: number, updateRecordDto: UpdateRecordDto) {
  //   return `This action updates a #${id} record`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} record`;
  // }
}
