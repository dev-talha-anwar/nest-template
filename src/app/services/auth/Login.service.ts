import { Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { checkHash } from 'src/app/utils/auth/bcrypt';
import { UtilHelper } from 'src/app/utils/helpers/Util.helper';
import { DBHelper } from '../../utils/helpers/DB.helper';
import { DatabaseService } from '../database/Database.service';
import { AuthService } from './Auth.service';
var moment = require("moment");
//
@Injectable()
export class LoginService {
  constructor(private readonly DB: DatabaseService,private readonly authService: AuthService ) {}
  async login(getLogin) {
    var minutesToTimezoneDifference = (minutes) => {
      var x = minutes;
      var flag = Math.abs(x) > 0 ? '+' : '-';
      var MINUTES = Math.abs(x); //some integer
      var m = MINUTES % 60;
      var h = (MINUTES - m) / 60;
      var HHMM =
        flag +
        (h < 10 ? '0' : '') +
        h.toString() +
        ':' +
        (m < 10 ? '0' : '') +
        m.toString();
      return HHMM;
    }
    let user = await this.DB.Models['User'].findOne({
      attributes:['timezone','last_login','modified'],
      where:[{email:getLogin.email,platform_id:getLogin.platform_id}]
    })
    console.log('adfffffffffff')
    console.log(user)
    console.log('ldkjfkdkfjdkjfld')
    const searchEmail = await this.DB.Models['User'].findOne({
      attributes:['id','platform_id','first_name','last_name','role_id','username','description','password','email','image','status','is_online','notification_count', DBHelper.timeZone(user.timezone),DBHelper.timeZone(user.timezone,'modified'),DBHelper.timeZone(user.timezone,'last_login'),'is_stats','timezone'],
      where: [{ email: getLogin.email }]
    })
    console.log(searchEmail)
    const searchPlatform = await this.DB.Models['User'].findOne({
      where: [{ email: getLogin.email, platform_id: getLogin.platform_id }]
    })
    if (searchEmail) {
      if (searchEmail.status === 1) {
        if (searchPlatform) {
          if (checkHash(getLogin.password, searchEmail.password)) {
            const d = moment().format('YYYY-MM-DD HH:mm:ss');
            let tokens = getLogin.token
            console.log(getLogin.timezone)
            let sql = await this.DB.Models['User'].update({
              is_online: 1, fcm_token: getLogin.token, timezone: minutesToTimezoneDifference(getLogin.timezone), last_login:d
            },
              {
                where: [{ id: searchEmail.id }]
              }
            )
            let parameters = [];
            if (tokens ?? false) {
              if (searchEmail.fcm_token && !searchEmail.fcm_token.split(',').includes(tokens)) {
                let tokensArray = searchEmail.fcm_token.split(',')
                tokensArray.push(tokens)
                tokens = tokensArray.join(',');
              }
              parameters = [1, tokens, minutesToTimezoneDifference(getLogin.timezone), searchEmail.id]
            } else {
              sql = await this.DB.Models['User'].update({
                is_online: 1, timezone: minutesToTimezoneDifference(getLogin.timezone), last_login:d 
              },
                {
                  where: [{ id: searchEmail.id }]
                }
              )
            }
            // let roww = await mysqlAsyncAwait("insert into app_logs (email,login_time,platform_id) values(?,?,?)",
            // [req.query.email, d, req.query.platform_id], mysqlconnection);
            // let roww = await this.DB.Models['AppLogs'].create({
            //   email:searchEmail.email, login_time:d, platform_id:searchPlatform.platform_id
            // })
            // let rows1 = await sql
            // let row1211 = await mysqlAsyncAwait("SELECT group_id FROM group_users where user_id = ?", [rows.id], mysqlconnection);
            let row1211 = await this.DB.Models['GroupUser'].findAll({
              attributes: ['group_id'],
              where: [{ user_id: searchEmail.id }]
            })
            if (row1211.length > 0) {
              searchEmail.group_id = row1211;
              const b = []
              b.push(searchEmail)
              const a = (await this.authService.login(searchEmail)).access_token;
              searchEmail.access_token = a
              return ({
                status: 'true',
                user: b,
                message: "success",
              });
            } else {
              let abcd = [];
              // let row12114 = await mysqlAsyncAwait("SELECT group_id FROM tutorial_groups where user_id = ?",
              let row12114 = await this.DB.Models['TutorialGroup'].findAll({
                attributes: ['group_id'],
                where: [{ user_id: searchEmail.id }]
              })
              abcd = row12114;
              if (row12114.length > 0) {
                searchEmail.group_id = row12114;
              } else {
                abcd = [];
                searchEmail.group_id = [];
              }
              const b = []
              b.push(searchEmail)
              const a = (await this.authService.login(searchEmail)).access_token;
              searchEmail.access_token = a
              return ({
                status: 'true',
                user: b,
                message: "success",
              });
            }
          }
          else {
            return ({
              status: false,
              message: 'The password you entered is incorrect'
            })
          }
        }
        else {
          return ({
            status: false,
            message: 'You are not authorized to access this platform'
          })
        }
      }
      else {
        return ({
          status: false,
          message: 'Account not activated.'
        })
      }
    }
    else {
      return ({
        status: false,
        message: 'No any user registerd with this email'
      })
    }

  }
}
