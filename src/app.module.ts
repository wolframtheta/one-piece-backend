import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { IntroConfigModule } from './config/config.module';
import { XarxaModule } from './xarxa/xarxa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: config.get('DB_SYNCHRONIZE', 'false') === 'true',
        ssl: { rejectUnauthorized: true },
      }),
    }),
    AuthModule,
    ProgressModule,
    IntroConfigModule,
    XarxaModule,
  ],
})
export class AppModule {}
