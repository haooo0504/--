import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { Project } from 'src/interface/project.interface';
import { IResponse } from 'src/interface/response.interface';
import { UserService } from '../user/user.service';

const logger = new Logger('project.service');

@Injectable()
export class ProjectService {
  private response: IResponse;
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
    private readonly userService: UserService,
  ) {}

  //創建項目
  public async createProject(project: Project) {
    const createProject = new this.projectModel(project);
    try {
      const date: Date = createProject._id.getTimestamp();
      createProject['date'] = date.toLocaleString();
      console.log(createProject);
      const project = await createProject.save();
      await this.userService.addUserProject(project._id, project.createrId);
      this.response = {
        code: 0,
        message: { message: '項目創建成功', projectId: project._id },
      };
    } catch (error) {
      logger.warn('創建項目失敗', error);
      this.response = { code: 6, message: '創建項目失敗' };
    } finally {
      return this.response;
    }
  }

  //刪除項目
  public async deleteProjectById(projectId: string) {
    try {
      await this.projectModel.findByIdAndDelete(projectId);
      this.response = {
        code: 0,
        message: '項目刪除成功',
      };
    } catch (error) {
      this.response = {
        code: 7,
        message: '項目刪除失敗',
      };
    }
    return this.response;
  }

  //修改項目
  public async alterProjectById(projectId: string, project: Project) {
    try {
      await this.projectModel.findByIdAndUpdate(projectId, project);
      this.response = {
        code: 0,
        message: '項目修改成功',
      };
    } catch (error) {
      this.response = {
        code: 7,
        message: '項目修改失敗',
      };
    }
    return this.response;
  }

  //查詢項目
  public async findProjectById(projectId: string) {
    try {
      const _project = await this.projectModel.findById(projectId);
      this.response = {
        code: 0,
        message: _project,
      };
    } catch (error) {
      this.response = {
        code: 7,
        message: '查詢項目失敗',
      };
    }
    return this.response;
  }

  //根據用戶ID獲取所有項目
  public async getProjectByUser(userid: string) {
    try {
      const user = await this.userService.findOneById(userid);
      const projectIds = user.projectIds;
      const projects = await this.projectModel.find({
        _id: { $in: projectIds },
      });
      console.log(projects);
      this.response = { code: 0, message: projects };
      // const _project = (await this.projectModel.find({})).map((v) => {
      //   const date: Date = v._id.getTimestamp();
      //   v['date'] = date.toLocaleString();
      //   return v;
      // });
      // this.response = {
      //   code: 0,
      //   message: _project,
      // };
    } catch (error) {
      logger.warn('創建項目失敗', error);

      this.response = { code: 7, message: '獲取項目失敗' };
    }
    return this.response;
  }
}
