import { ApiProperty } from '@nestjs/swagger';

export class refreshToken {
  @ApiProperty()
  public token: string;
}
