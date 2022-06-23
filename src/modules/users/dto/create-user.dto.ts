import { ApiProperty } from '@nestjs/swagger';

export class CreateProfile {
  @ApiProperty()
  public user_id: number;

  @ApiProperty()
  public full_name: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  public address: string;

  @ApiProperty()
  public photo: string;
}
export class CreateUserDto {
  @ApiProperty()
  public nip: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public role_id: number;

  @ApiProperty()
  public agency_id: number;

  @ApiProperty()
  public is_active: boolean;

  @ApiProperty()
  public status_id: number;

  @ApiProperty()
  public profile: CreateProfile;
}
export class CreateUsers {
  @ApiProperty({ type: [CreateUserDto] })
  public users: [];
}
