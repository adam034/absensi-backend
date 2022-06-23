import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, CreateUsers } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './entities/profile.model';
import { User } from './entities/user.model';
import * as moment from 'moment';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  async createUser(createUser: CreateUserDto) {}
  async createUsers(createUsers: CreateUsers) {}
  async getUsers(limit: number, pagination: number, search: string) {}
  async getUser() {
    var startDate = moment('2022-01-01');
    var endDate = moment('2022-01-10');
    var employees = [
      {
        id: 1,
        name: 'x',
        records: [
          {
            value: 1,
            date: '2022-01-01',
          },
          {
            value: 2,
            date: '2022-01-02',
          },
        ],
      },
      {
        id: 2,
        name: 'y',
        records: [
          {
            value: 1,
            date: '2022-01-01',
          },
          {
            value: 2,
            date: '2022-01-02',
          },
        ],
      },
    ];

    var dateList = await this.GetDaysBetweenDate(startDate, endDate);
    return {
      data: dateList,
    };
  }
  async updateUser(id: number) {}
  async deleteUser(id: number) {}

  private async GetDaysBetweenDate(start: any, end: any) {
    var now = start.clone(),
      dates = [];

    while (now.isSameOrBefore(end)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  }
  private async getFormatRecords(emps: any, dates: any) {
    for (let i = 0; i < emps.length; i++) {
      for (let j = 0; j < emps[i].records.length; j++) {}
    }
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
