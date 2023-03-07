import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, mixin, Type } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/models/User.model';
import { DatabaseService } from 'src/app/services/database/Database.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService, private DB: DatabaseService) {
  }
  async canActivate(context: ExecutionContext) {
    try {
      const decoded = this.jwtService.verify(context.switchToWs().getClient().handshake.headers.authorization.split(' ')[1], { secret: process.env.JWT_SECRET });
      let user: User = await this.DB.Models['User'].findOne(decoded.id)
      if (user) {
        return true
      }
    } catch (error) { 
      console.log(error);
    }
    return false;
  }
}