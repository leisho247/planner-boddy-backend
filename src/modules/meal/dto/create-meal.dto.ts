import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateMealDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  urlImage?: string; // Opcional y debe ser una URL válida si se proporciona
}
