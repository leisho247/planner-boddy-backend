import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  title: string;

  @IsUrl()
  @IsOptional()
  urlImage?: string; // Campo opcional
}