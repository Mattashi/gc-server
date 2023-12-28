import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register({}), CacheModule.register()],
})
export class AuthModule {}
