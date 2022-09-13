import { Injectable, Logger } from '@nestjs/common';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (res.length === 0) {
          this.response = { code: 3, message: '用戶尚未註冊' };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        // console.log(dbUser);
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          return (this.response = {
            code: 0,
            message: { userid: dbUser._id, username: dbUser.name },
          });
        } else {
          this.response = { code: 4, message: '用戶密碼錯誤' };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  public async login(user: User) {
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response;
        }
        const account = user.phone;
        const userid = res.message.userid;
        const date: Date = userid.getTimestamp();
        res.message['date'] = date.toLocaleString();
        const createdate = res.message.date;
        const username = res.message.username;
        this.response = {
          type: 'success',
          code: 0,
          message: '登入成功',
          result: {
            token: await this.createToken(user),
            account,
            userid,
            username,
            createdate,
          },
        };
        return this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  public async findOneByPhone(phone: string) {
    return await this.userModel.find({ phone });
  }

  public async regist(user: User) {
    return this.findOneByPhone(user.phone)
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 1,
            message: '當前手機號已註冊',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          const account = user.phone;
          const date: Date = createUser._id.getTimestamp();
          user['createdate'] = date.toLocaleString();
          await createUser.save(),
            (this.response = {
              code: 0,
              message: '用戶註冊成功',
              result: {
                account: account,
                username: user.name,
                token: await this.createToken(user),
                userid: createUser._id,
                createdate: user.createdate,
              },
            });
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            message: '用戶註冊失敗,請聯繫相關人員,錯誤詳情:' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(err.msg);
        return this.response;
      });
  }

  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }

  public async alter(user: User) {
    return this.userService.findOneByPhone(user.phone).then(async () => {
      return await this.userModel
        .findOneAndUpdate({ phone: user.phone }, user)
        .then(() => {
          logger.log('用戶修改成功');
          return (this.response = { code: 0, message: '用戶修改成功' });
        });
    });
  }
}
