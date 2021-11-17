import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.local'],
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:3306')
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DATABASE_URL'),
        };
      },
    }),
    HelperModule,
  ],
})
export class AppModule {}
