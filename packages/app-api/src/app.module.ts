import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './common/db/db.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config'

@Module({
  imports: [
    DBModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
