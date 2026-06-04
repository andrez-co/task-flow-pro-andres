import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('estudiantes')
export class Estudiante {
  @ApiProperty({ description: 'Identificador único', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  identificador: string;

  @ApiProperty({ description: 'Nombre', example: 'Juan' })
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ApiProperty({ description: 'Apellido', example: 'Pérez' })
  @Column({ type: 'varchar', length: 150 })
  apellido: string;

  @ApiProperty({ description: 'Código del estudiante', example: 'EST-001' })
  @Column({ type: 'varchar', length: 100, unique: true })
  codigo: string;

  @ApiProperty({ description: 'Cédula de identidad', example: '1234567890', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  cedula: string;

  @ApiProperty({ description: 'Número de teléfono', example: '0987654321', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  numero: string;

  @ApiProperty({ format: 'date-time', description: 'Fecha de creación' })
  @CreateDateColumn()
  fechaCreacion: Date;

  @ApiProperty({ format: 'date-time', description: 'Fecha de actualización' })
  @UpdateDateColumn()
  fechaActualizacion: Date;
}
