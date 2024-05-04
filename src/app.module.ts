import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthController } from './auth/controllers/auth.controller'; // Import AuthController
import { AuthService } from './auth/services/auth.services'; // Import AuthService

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController], // Include AuthController here
  providers: [AppService, GoogleStrategy, AuthService], // Include AuthService here
})
export class AppModule {}
