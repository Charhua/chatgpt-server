import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class GetTokenDTO {
  @ApiProperty({ description: '类型' })
  @IsNotEmpty({ message: 'type必填' })
  @IsIn(['1', '2'], { message: 'type值只能为1或2,1为获取token，2为刷新token' })
  type: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: 'email必填' })
  email: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: 'password必填' })
  password: string;
}
