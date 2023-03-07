import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { QueryTypes } from 'sequelize';
import { User } from 'src/app/models/User.model';
import { DatabaseService } from 'src/app/services/database/Database.service';
import { WsGuard } from 'src/app/utils/auth/guards/Ws.guard';
import { UtilHelper } from 'src/app/utils/helpers/Util.helper';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  io;

  constructor(private readonly DB: DatabaseService, private jwtService: JwtService) { }

  async handleConnection(client) {
    try{
      const decoded = this.jwtService.verify(client.handshake.headers.authorization.split(' ')[1], {secret: process.env.JWT_SECRET});
      let user: User =  await this.DB.Models['User'].findOne(decoded.id)
      if(user){
        return true
      }
    }catch(e){
      console.log(e);
    }
    client.disconnect('Bad Request');
  }

  async handleDisconnect() {}

  @UseGuards(WsGuard)
  @SubscribeMessage('following')
  async onFollowing(client, msg) {
    console.log('in socket',msg);
    
    var f = "following";
    let row12345 = await this.DB.Models['User'].findAll({
      attributes: [ 'notification_count' ],
      where: {
        id: msg.user_id,
        platform_id: msg.platform_id
      }
    })
    var ab = row12345[0].notification_count;
    var plus = parseInt(ab) + 1;
    var abcd = "notification_count" + msg.user_id;
    this.io.emit(abcd, plus);
    let row345 = await this.DB.Models['User'].update({
      notification_count: plus
    },{
      where: {
        id: msg.user_id,
        platform_id: msg.platform_id
      }
    })
    let row = await this.DB.Models['Notification'].bulkCreate([{
      platform_id: msg.platform_id,
      type: "following",
      user_id: msg.user_id,
      group_id: 0,
      tutorial_id: 0,
      from_user_id: msg.from_id,
      is_read: 0,
      created: msg.created,
      modified: msg.created,
      action: 3,
      message_title: 'has started Following you'
    },{
      platform_id: msg.platform_id,
      type: "following",
      user_id: msg.user_id,
      group_id: 0,
      tutorial_id: 0,
      from_user_id: msg.from_id,
      is_read: 0,
      created: msg.created,
      modified: msg.created,
      action: 3,
      message_title: 'has started Following you',
      is_activity: 1
    }])
    row = await this.DB.Models['User'].findAll({
      attributes: ['first_name','last_name','fcm_token'],
      where: {
        id: msg.from_id,
        platform_id: msg.platform_id
      }
    })
    let row1 = await this.DB.Models['User'].findAll({
      attributes: ['first_name', 'fcm_token'],
      where: {
        id: msg.user_id,
        platform_id: msg.platform_id
      }
    })
    var token = row1[0].fcm_token;
    var body = "";
    var title = row[0].first_name + " " + row[0].last_name + " has started Following you";
    if (row1[0].fcm_token == "" || row1[0].fcm_token == null) { } else {
      await UtilHelper.firebase(token, body, title, {
        action: "3",
        from_user_id: `${msg.from_id}`,
      });
    }
    row1 = await this.DB.Models['Notification'].sequelize.query(`select notifications.from_user_id,users.first_name,users.last_name,users.image,notifications.type,notifications.group_id,notifications.created from notifications left join users on notifications.from_user_id = users.id where notifications.platform_id=${msg.platform_id} and notifications.user_id=${msg.user_id} and notifications.from_user_id=${msg.from_id} and notifications.type="${f}" AND notifications.platform_id=${msg.platform_id} order by notifications.created desc`, { type: QueryTypes.SELECT })
    let check = await this.DB.Models['Notification'].sequelize.query(`select count(*) as count from followers where (followed_by=${msg.user_id} and followed_to=${msg.from_id}) OR (followed_by=${msg.from_id} and followed_to=${msg.user_id}) AND platform_id=${msg.platform_id}`, { type: QueryTypes.SELECT })
    var msg1: any = {
      from_user_id: row1[0].from_user_id,
      first_name: row1[0].first_name,
      last_name: row1[0].last_name,
      image: row1[0].image,
      type: row1[0].type,
      group_id: row1[0].group_id,
      created: row1[0].created,
      video_thumbnail: "",
    };
    ab = "following" + msg.user_id;
    if (check.count >= 2) {
      msg1.friends = true;
    } else {
      msg1.friends = false;
    }
    this.io.emit(ab, msg1);
  }
  
}
