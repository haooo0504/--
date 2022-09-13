import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from 'src/interface/project.interface';
import { ProjectService } from './project.service';

@Controller('project')
@ApiTags('用戶項目模塊')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({
    summary: '新增項目',
  })
  public addProject(@Body() project: Project) {
    return this.projectService.createProject(project);
  }

  @Post('delete/:id')
  @ApiOperation({
    summary: '刪除項目',
  })
  public removeProject(@Param('id') projectId: string) {
    return this.projectService.deleteProjectById(projectId);
  }

  @Post('alter/:id')
  @ApiOperation({
    summary: '修改項目',
  })
  public changeProject(
    @Param('id') projectId: string,
    @Body() project: Project,
  ) {
    return this.projectService.alterProjectById(projectId, project);
  }

  @Post('find/:id')
  @ApiOperation({
    summary: '查詢項目',
  })
  public findProject(@Param('id') projectId: string) {
    return this.projectService.findProjectById(projectId);
  }

  @Get('project/:id')
  @ApiOperation({
    summary: '獲取所有項目',
  })
  public getAllProject(@Param('id') userid: string) {
    return this.projectService.getProjectByUser(userid);
  }
}
