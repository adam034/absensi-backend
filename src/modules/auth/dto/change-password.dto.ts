import { ApiProperty } from '@nestjs/swagger';

export class ChangePassword {
  @ApiProperty()
  public old_password: string;

  @ApiProperty()
  public new_password: string;
}
export class ResetPassword {
  @ApiProperty()
  public user_id: number;
}
