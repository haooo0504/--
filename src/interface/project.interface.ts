import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop()
  @ApiProperty({
    description: '項目名稱',
    example: '後台管理',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '項目內容',
    example: '後台管理',
  })
  readonly content: string;

  @Prop()
  @ApiProperty({
    description: '項目創建日期',
    example: '2022/09/06',
  })
  date?: string;

  @Prop()
  @ApiProperty({
    description: '創建者Id',
    example: '123',
  })
  readonly createrId?: string;
}
