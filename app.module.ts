import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConvertModule } from './convert/convert.module.js';
import { ShopModule } from './shop/shop.module.js';
import { AcademicModule } from './academic/academic.module.js';
import { UtilityModule } from './utility/utility.module.js';

@Module({
  imports: [ConvertModule, ShopModule, AcademicModule, UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
