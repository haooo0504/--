import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    ProjectModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
