import { ApiProperty } from '@nestjs/swagger';

export class changePassword {
  @ApiProperty()
  public old_password: string;

  @ApiProperty()
  public new_password: string;
}
