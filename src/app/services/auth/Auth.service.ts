import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/app/models/User.model';
import { checkHash } from 'src/app/utils/auth/bcrypt';
import { AuthHelper } from 'src/app/utils/helpers/Auth.helper';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly user: typeof User,private jwtService: JwtService, ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.user.findOne(
      {
        attributes:['password','email','id','platform_id','role_id','timezone'],
        where: { email: email }
       }
      );
    if (user) {
      if(checkHash(pass, user.password)){
        
        const { password, ...result } = user;
        return result;
      }else{
      }    
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email,
      id: user.id,
      platform_id: user.platform_id,
      role: AuthHelper.dbToRoleMap(user.role_id),
      time_zone: user.timezone
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
