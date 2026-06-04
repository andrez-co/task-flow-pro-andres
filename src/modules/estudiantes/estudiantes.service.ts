import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

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

  async obtenerPorId(id: string): Promise<Estudiante> {
    const estudiante = await this.estudianteRepo.findOne({ where: { identificador: id } });
    if (!estudiante) {
      throw new ConflictException(`El estudiante con ID ${id} no existe`);
    }
    return estudiante;
  }

  async actualizar(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.obtenerPorId(id);
    
    // Si actualiza el código, verificar que no exista
    if (dto.codigo && dto.codigo !== estudiante.codigo) {
      const existente = await this.estudianteRepo.findOne({ where: { codigo: dto.codigo } });
      if (existente) {
        throw new ConflictException(`El código ${dto.codigo} ya está en uso`);
      }
    }

    Object.assign(estudiante, dto);
    return await this.estudianteRepo.save(estudiante);
  }

  async eliminar(id: string): Promise<void> {
    const estudiante = await this.obtenerPorId(id);
    await this.estudianteRepo.remove(estudiante);
  }
}
