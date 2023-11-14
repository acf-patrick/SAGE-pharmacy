import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

class Match {
  @IsString()
  @ApiProperty()
  id: string; // Medicine from provider ID

  @IsString()
  @ApiProperty()
  name: string; // Medicine from stock name
}

export class UpdateMatchesDto {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: Match,
  })
  matches: Match[];
}
