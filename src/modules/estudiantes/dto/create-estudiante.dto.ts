import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstudianteDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del estudiante' })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del estudiante' })
  @IsString()
  @MinLength(1)
  apellido: string;

  @ApiProperty({ example: 'EST-001', description: 'Código único del estudiante' })
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ example: '1234567890', description: 'Cédula del estudiante', required: false })
  @IsString()
  @IsOptional()
  cedula: string;

  @ApiProperty({ example: '0987654321', description: 'Número de teléfono', required: false })
  @IsString()
  @IsOptional()
  numero: string;
}
