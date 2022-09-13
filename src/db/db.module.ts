import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schema';
import { UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'PROJECT_MODEL',
    schema: ProjectSchema,
    collection: 'project',
  },
]);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.tnhmbkd.mongodb.net/test`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule {}
