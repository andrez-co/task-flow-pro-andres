import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbPort = Number(configService.get<string>('DB_PORT') ?? 3306);
        const dbUsername =
          configService.get<string>('DB_USERNAME') ??
          configService.getOrThrow<string>('DB_USER');
        const dbDatabase =
          configService.get<string>('DB_DATABASE') ??
          configService.getOrThrow<string>('DB_NAME');
        const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';

        const base = {
          type: 'mysql' as const,
          host: configService.get<string>('DB_HOST') ?? 'localhost',
          port: Number.isNaN(dbPort) ? 3306 : dbPort,
          username: dbUsername,
          password: configService.getOrThrow<string>('DB_PASSWORD'),
          database: dbDatabase,
          autoLoadEntities: true,
          // En desarrollo, sincronizar automáticamente. En producción, usar migraciones
          synchronize: nodeEnv === 'development',
          logging: nodeEnv === 'development',
        } as any;

        // Soporte opcional de SSL (por ejemplo Aiven requiere SSL)
        const sslMode = configService.get<string>('DB_SSL') ?? '';
        const sslCaPath = configService.get<string>('DB_SSL_CA');
        if (sslMode.toLowerCase() === 'required' || sslMode.toLowerCase() === 'true') {
          const caPath = sslCaPath
            ? path.resolve(process.cwd(), sslCaPath)
            : path.resolve(process.cwd(), 'certs', 'aiven-ca.pem');

          if (fs.existsSync(caPath)) {
            base.ssl = { ca: fs.readFileSync(caPath) };
          } else {
            // Si no existe el CA, dejar la configuración SSL vacía para que falle claramente
            base.ssl = true;
          }
        }

        return base;
      },
    }),
  ],
})
export class DatabaseModule {}
