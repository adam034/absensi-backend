import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, CreateUsers } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './entities/profile.model';
import { User } from './entities/user.model';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  async createUser(createUser: CreateUserDto) {
    const [user, created] = await this.userModel.findOrCreate({
      where: {
        nip: createUser.nip,
      },
      defaults: {
        password: bcrypt.hashSync('user123', 10),
        role_id: createUser.role_id,
        agency_id: createUser.agency_id,
        is_active: true,
        status_id: 2,
      },
    });
    if (!created)
      throw new HttpException(
        {
          success: false,
          message: `user with nip ${createUser.nip} already exist`,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );

    await this.profileModel.create({
      user_id: user.user_id,
      full_name: createUser.profile.full_name,
      phone: createUser.profile.phone,
      address: createUser.profile.address,
      photo:
        createUser.profile.photo === '' ||
        createUser.profile.photo === undefined
          ? 'http://image.com'
          : createUser.profile.photo,
    });
    return {
      success: true,
      message: 'success create user',
      data: {
        user_id: user.user_id,
        nip: user.nip,
        password: user.password,
        role_id: user.role_id,
        agency_id: user.agency_id,
        is_active: user.is_active,
        status_id: user.status_id,
        profile: {
          full_name: createUser.profile.full_name,
          phone: createUser.profile.phone,
          address: createUser.profile.address,
          photo: createUser.profile.photo,
        },
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deleted_at: user.deletedAt,
      },
    };
  }
  async createUsers(createUsers: CreateUsers) {}

  async getUsers(limit: any, pagination: any, search: string) {
    let condition = {
        where: {},
      },
      options = {},
      data = [];

    if (search) {
      condition.where['full_name'] = {
        [Op.iLike]: `%${search}%`,
      };
    }
    if (limit & pagination) {
      options = {
        offset: (parseInt(pagination) - 1) * parseInt(limit),
        limit: parseInt(limit),
      };
    }
    const users: any = await this.userModel.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Profile,
          as: 'profile',
          ...condition,
        },
      ],
      ...options,
    });
    data = users.rows.map((user: any) => {
      const { profile } = user;
      return {
        id: user.user_id,
        nip: user.nip,
        role: user.role_id,
        agency: user.agency_id,
        is_active: user.is_active,
        profile: {
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          photo: profile.photo,
        },
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      };
    });
    return {
      success: true,
      message: 'success get list users',
      data: data,
      meta: {
        pagination: pagination ? Number(pagination) : 0,
        limit: limit ? Number(limit) : 0,
        total_page: limit
          ? Math.ceil(parseInt(users.count) / Number(limit))
          : 0,
        count: users.count ? parseInt(users.count) : 0,
      },
    };
  }
  async getUser(id: string) {
    let user = null;
    const getUser = await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Profile,
          as: 'profile',
        },
      ],
    });
    user = {
      id: getUser.user_id,
      nip: getUser.nip,
      role: getUser.role_id,
      agency: getUser.agency_id,
      is_active: getUser.is_active,
      profile: {
        id: getUser.profile.profile_id,
        full_name: getUser.profile.full_name,
        phone: getUser.profile.phone,
        address: getUser.profile.address,
        photo: getUser.profile.photo,
      },
      created_at: getUser.createdAt,
      updated_at: getUser.updatedAt,
    };
    return {
      success: true,
      message: 'success get detail user',
      data: user,
    };
  }
  async updateUser(id: string, update: UpdateUserDto) {
    const changeUser = await this.userModel.update(
      {
        nip: update.nip,
        role_id: update.role,
        agency_id: update.agency,
      },
      {
        where: {
          user_id: Number(id),
        },
      },
    );
    if (changeUser) {
      await this.profileModel.update(
        {
          full_name: update.profile.full_name,
          phone: update.profile.phone,
          address: update.profile.address,
          photo: update.profile.photo,
        },
        {
          where: {
            user_id: Number(id),
          },
        },
      );
    }
    return {
      success: true,
      message: 'success update user',
      data: {
        id: Number(id),
        nip: update.nip,
        role_id: update.role,
        agency_id: update.agency,
        full_name: update.profile.full_name,
        phone: update.profile.phone,
        address: update.profile.address,
        photo: update.profile.photo,
      },
    };
  }
  async deleteUser(id: string) {
    await this.userModel.update(
      {
        deletedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        where: {
          user_id: Number(id),
        },
      },
    );
  }

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
  // jangan di hapus ini
  // var startDate = moment('2022-01-01');
  // var endDate = moment('2022-01-10');
  // var employees = [
  //   {
  //     id: 1,
  //     name: 'x',
  //     records: [
  //       {
  //         value: 1,
  //         date: '2022-01-01',
  //       },
  //       {
  //         value: 2,
  //         date: '2022-01-02',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'y',
  //     records: [
  //       {
  //         value: 1,
  //         date: '2022-01-01',
  //       },
  //       {
  //         value: 2,
  //         date: '2022-01-02',
  //       },
  //     ],
  //   },
  // ];
  // var dateList = await this.GetDaysBetweenDate(startDate, endDate);
  // return {
  //   data: dateList,
  // };

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
