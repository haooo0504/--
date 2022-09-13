import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  public async findOneByPhone(phone: string) {
    return await this.userModel.find({ phone });
  }

  public async findOneById(id: string) {
    return await this.userModel.findById(id);
  }

  public async addUserProject(projectId, userid) {
    const user: User = await this.findOneById(userid);
    // console.log(projectId);
    user.projectIds.push(projectId);
    await this.userModel.findByIdAndUpdate(userid, user);
  }
}
