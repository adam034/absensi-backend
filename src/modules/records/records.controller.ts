import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('records')
@ApiTags('ABS - Records')
@ApiBearerAuth()
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto, @Req() req: any) {
    const { user_id } = req.user;
    return this.recordsService.create(createRecordDto, user_id);
  }

  // @Get()
  // findAll() {
  //   return this.recordsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
  //   return this.recordsService.update(+id, updateRecordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recordsService.remove(+id);
  // }
}
