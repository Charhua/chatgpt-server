import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';

class GptMain {
  @ApiProperty({ description: 'api-key' })
  @IsNotEmpty({ message: 'key必填' })
  key: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: 'content必填' })
  content: string;

  @ApiProperty({ description: '是否使用消息跟随' })
  @IsNotEmpty({ message: 'isFollow必填' })
  isFollow: boolean;

  @ApiProperty({ description: '消息跟随id' })
  @ValidateIf((o) => o.isFollow)
  @IsNotEmpty({ message: '当isFollow为true时，parentMessageId必填' })
  parentMessageId: string;

  @ApiProperty({ description: '其他参数选项' })
  opts: object;
}

export class GptRequestDTO {
  @ApiProperty({ description: '模式' })
  @IsNotEmpty({ message: '模式mode必填' })
  @IsIn(['1', '2'], { message: '有效值为1或2' })
  mode: string;

  @ApiProperty({ description: '类型' })
  @IsNotEmpty({ message: '类型type必填' })
  @IsIn(['1'], { message: '有效值为1' })
  type: string;

  @ApiProperty({ description: 'gpt请求参数' })
  @IsNotEmpty({ message: 'gpt请求参数opts必填' })
  @Type(() => GptMain)
  @ValidateNested()
  opts: GptMain;
}
