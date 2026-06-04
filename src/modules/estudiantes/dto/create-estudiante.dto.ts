import { IsString, MinLength } from 'class-validator';
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
}
