import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { User } from 'src/app/models/User.model';
import { hashPassword } from 'src/app/utils/auth/bcrypt';
import { UtilHelper } from 'src/app/utils/helpers/Util.helper';
import { DatabaseService } from '../database/Database.service';

@Injectable()
export class ForgetPasswordService {
  constructor(private readonly DB: DatabaseService, private readonly mailService: MailerService) { }

  async forgetpassword(email: string, platform_id: number) {
    const searchEmail = await this.DB.Models['User'].findOne({
      where: [{ email: email, platform_id: platform_id }]
    })
    if (searchEmail) {
      var val = Math.floor(1000 + Math.random() * 9000);
      await this.DB.Models['User'].update({
        f_code: val
      },
        {
          where: [{ email: email, platform_id: platform_id }]
        })
      return await this.mailService.sendMail({
        to: email,
        from: 'Giisty',
        subject: 'Forget password by Giisty',
        template: 'forgetpassword',
        context: {
          first_name: searchEmail.first_name,
          last_name: searchEmail.last_name,
          val: val
        }
      })
    }
  }
  async changePassword(password: string, email: string, platform_id: number) {
    let pass = hashPassword(password)
    console.log(pass)
    const res = await this.DB.Models['User'].update({
      password: password, f_code: null,
    },
      {
        where: [{ email: email, platform_id: platform_id }]
      }
    )
    return res
  }
  
  async codeVerified(email: string, platform_id: number) {
    const res = await this.DB.Models['User'].findOne({
      attributes: ['f_code'],
      where: [{ email: email, platform_id: platform_id }]
    })
    return res
  }

}
