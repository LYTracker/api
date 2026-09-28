import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  @IsNotEmpty()
  ownerId!: string;
}
