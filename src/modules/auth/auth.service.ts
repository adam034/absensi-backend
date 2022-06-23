import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../users/entities/profile.model';
import { User } from '../users/entities/user.model';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { changePassword } from './dto/change-password.dto';
import { Credential } from './entities/credential.model';
import { refreshToken } from './dto/refresh-token.dto';
import { sequelize } from 'src/database/db.injection';
import Excel from 'exceljs';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
    @InjectModel(Credential) private credentialModel: typeof Credential,
  ) {}
  async login(auth: CreateAuthDto) {
    // console.log(1);
    if (
      !auth.nip ||
      !auth.password ||
      !auth.platform ||
      auth.nip === '' ||
      auth.password === '' ||
      auth.platform === ''
    ) {
      throw new HttpException(
        {
          success: false,
          message: 'field nip or password cant be empty',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userModel.findOne({
      where: {
        nip: auth.nip,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          success: false,
          message: 'user not found',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { user_id, password, is_active, role_id } = user;
    const comparedPassword = bcrypt.compareSync(auth.password, password);
    if (!comparedPassword) {
      throw new HttpException(
        {
          success: false,
          message: 'password not match',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (is_active === false) {
      throw new HttpException(
        {
          success: false,
          message: 'user inactive',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (role_id === 1 && auth.platform === 'mobile') {
      throw new HttpException(
        {
          success: false,
          message: 'user not allowed for this platform',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (role_id === 2 && auth.platform === 'mobile') {
      throw new HttpException(
        {
          success: false,
          message: 'user not allowed for this platform',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (role_id === 3 && auth.platform === 'web') {
      throw new HttpException(
        {
          success: false,
          message: 'user not allowed for this platform',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const credentialUser = await this.credentialModel.findOne({
      where: {
        user_id: user_id,
      },
    });
    let token = await this.generateToken({ id: user_id });
    if (!credentialUser) {
      await this.credentialModel.create({
        user_id: user_id,
        token_value: token,
      });
    } else {
      await this.credentialModel.update(
        {
          token_value: token,
        },
        {
          where: {
            user_id: user_id,
          },
        },
      );
    }

    return {
      success: true,
      message: 'successfully login',
      data: {
        token: token,
      },
    };
  }

  async changePassword(password: changePassword, id: number) {
    const user = await this.userModel.findOne({
      where: {
        user_id: id,
      },
    });
    const comparedPassword = bcrypt.compareSync(
      password.old_password,
      user.password,
    );
    const newPassword = bcrypt.hashSync(password.new_password, 10);
    if (!comparedPassword) {
      throw new HttpException(
        {
          success: false,
          message: 'old password didnt match',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userModel.update(
      {
        password: newPassword,
      },
      {
        where: {
          user_id: id,
        },
      },
    );
    return {
      success: true,
      message: 'successfully change password',
      data: {
        old_password: password.old_password,
        new_password: password.new_password,
      },
    };
  }

  async refreshToken(credential: refreshToken, id: number) {
    const findCredential = await this.credentialModel.findOne({
      where: {
        token_value: credential.token,
      },
    });
    if (!findCredential) {
      throw new HttpException(
        {
          success: false,
          message: 'token not found',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.credentialModel.destroy({
      where: {
        token_value: credential.token,
      },
    });
    let token = await this.generateToken({ id: id });
    await this.credentialModel.create({
      user_id: id,
      token_value: token,
    });

    return {
      success: true,
      message: 'successfully refresh token',
      data: {
        token: token,
      },
    };
  }

  async verifyUser(token: any) {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const user = await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { user_id: verify.id },
      include: [
        {
          attributes: {
            exclude: ['user_id'],
          },
          model: Profile,
          as: 'profile',
        },
      ],
    });
    return {
      success: true,
      message: 'success get verify user',
      data: user,
    };
    return user;
  }

  private async generateToken(payload: any) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async logout(user_id: any) {
    await this.credentialModel.destroy({
      where: {
        user_id: user_id,
      },
    });
    return {
      success: true,
      message: 'successfully logout',
      data: null,
    };
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
