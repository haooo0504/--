import { SchemaFactory } from '@nestjs/mongoose';
import { Project } from 'src/interface/project.interface';

export const ProjectSchema = SchemaFactory.createForClass(Project);
