import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
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

  @Get(':id')
  @ApiOperation({ summary: 'Obtener estudiante por ID' })
  @ApiOkResponse({ description: 'Estudiante encontrado', type: Estudiante })
  async obtenerPorId(@Param('id') id: string): Promise<Estudiante> {
    return this.estudiantesService.obtenerPorId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estudiante' })
  @ApiOkResponse({ description: 'Estudiante actualizado', type: Estudiante })
  async actualizar(
    @Param('id') id: string,
    @Body() dto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    return this.estudiantesService.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante' })
  @ApiOkResponse({ description: 'Estudiante eliminado' })
  async eliminar(@Param('id') id: string): Promise<void> {
    return this.estudiantesService.eliminar(id);
  }
}
