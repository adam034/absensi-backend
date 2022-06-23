import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  public nip: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public platform: string;
}
