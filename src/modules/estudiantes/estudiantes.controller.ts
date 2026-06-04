import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './estudiante.entity';

@ApiTags('estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista de estudiantes', type: [Estudiante] })
  async obtenerTodos(): Promise<Estudiante[]> {
    return this.estudiantesService.obtenerTodos();
  }

  @Post()
  @ApiBody({ type: CreateEstudianteDto })
  @ApiCreatedResponse({ description: 'Estudiante creado', type: Estudiante })
  async crear(@Body() dto: CreateEstudianteDto): Promise<Estudiante> {
    return this.estudiantesService.crear(dto);
  }
}
