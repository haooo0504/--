import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '用戶名稱',
    example: 'admin',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '用戶手機',
    example: '0900000000',
  })
  readonly phone: string;

  @Prop()
  @ApiProperty({
    description: '用戶密碼',
    example: '123456',
  })
  readonly password: string;

  @Prop()
  @ApiProperty({
    description: '用戶項目ID',
    example: '123',
  })
  readonly projectIds?: Array<string>;

  @Prop()
  @ApiProperty({
    description: '用戶創建日期',
    example: '2022/9/12',
  })
  createdate?: string;

  @Prop()
  readonly salt?: string;
}
