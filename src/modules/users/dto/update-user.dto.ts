import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  public full_name: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  public address: string;

  @ApiProperty()
  public photo: string;
}
export class UpdateUserDto {
  @ApiProperty()
  public nip: string;

  @ApiProperty()
  public role: number;

  @ApiProperty()
  public agency: number;

  @ApiProperty()
  public profile: UpdateProfileDto;
}
