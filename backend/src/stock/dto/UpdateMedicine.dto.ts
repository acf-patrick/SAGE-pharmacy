import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMedicineDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  location?: string;
  
  @IsString()
  @IsOptional()
  dci?: string;

  @IsBoolean()
  @IsOptional()
  isTaxed?: boolean;

  @IsNumber()
  @IsOptional()
  min?: number;
  
  @IsNumber()
  @IsOptional()
  max?: number;

  @IsDate()
  @IsOptional()
  expirationDate?: Date;

  @IsNumber()
  @IsOptional()
  costPrice?: number;
  
  @IsNumber()
  @IsOptional()
  sellingPrice?: number;
}