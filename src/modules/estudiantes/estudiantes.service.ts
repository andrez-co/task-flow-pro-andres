import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepo: Repository<Estudiante>,
  ) {}

  async obtenerTodos(): Promise<Estudiante[]> {
    return await this.estudianteRepo.find();
  }

  async crear(dto: CreateEstudianteDto): Promise<Estudiante> {
    const existente = await this.estudianteRepo.findOne({ where: { codigo: dto.codigo } });
    if (existente) {
      throw new ConflictException(`El código ${dto.codigo} ya existe`);
    }

    const nuevo = this.estudianteRepo.create({ ...dto });
    return await this.estudianteRepo.save(nuevo);
  }
}
