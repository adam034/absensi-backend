import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty()
  public position: string;
}
