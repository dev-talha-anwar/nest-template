import { DatabaseService } from "../database/Database.service";
import { Injectable } from "@nestjs/common";
import sequelize from "sequelize";
import { Op } from "sequelize";
import { hashPassword } from "src/app/utils/auth/bcrypt";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class InspireService{
    constructor(private readonly DB:DatabaseService,private readonly mailService: MailerService) {}

    async signupget(){
        {

            const a = []
            const b = []
            const c = []
            const d = []
            const e = []
            const f = []
            const row = await this.DB.Models['SignupPage'].findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('country')), 'country']],
                where: { [Op.not]: [{ country: null }] },
            })
            const row1 = await this.DB.Models['SignupPage'].findAll({
                attributes: ['speciality'],
                where: { [Op.not]: [{ speciality: null }] },
            })
            const row2 = await this.DB.Models['SignupPage'].findAll({
                attributes: ['workplace_type'],
                where: { [Op.not]: [{ workplace_type: null }] },
            })
            const row3 = await this.DB.Models['SignupPage'].findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.fn('CONCAT', '+' ,sequelize.col('country_code'))), 'country_code']],
                where: { [Op.not]: [{ country_code: null }] },
            })
            const row4 = await this.DB.Models['SignupPage'].findAll({
                attributes: ['city'],
                where: { [Op.not]: [{ city: null }] },
            })
            const row5 = await this.DB.Models['SignupPage'].findAll({
                attributes: ['workplace_sector'],
                where: { [Op.not]: [{ workplace_sector: null }] },
                distinct: true,
            })
            const rowsalu = await this.DB.Models['SignupPage'].findAll({
                attributes: ['salutation'],
                where: { [Op.not]: [{ salutation: null }] },
                distinct: true,
            })
    
            a.push(row4[0])
            a.push(row4[1])
            a.push(row4[2])
            a.push(row4[3])
            a.push(row4[4])
            a.push(row4[5])
            b.push(row4[6])
            b.push(row4[7])
            b.push(row4[8])
            b.push(row4[9])
            b.push(row4[10])
            b.push(row4[11])
            b.push(row4[12])
            c.push(row4[13])
            c.push(row4[14])
            c.push(row4[15])
            c.push(row4[16])
            c.push(row4[17])
            c.push(row4[18])
            d.push(row4[19])
            d.push(row4[20])
            d.push(row4[21])
            d.push(row4[22])
            d.push(row4[23])
            d.push(row4[24])
            d.push(row4[25])
            d.push(row4[26])
            e.push(row4[27])
            e.push(row4[28])
            e.push(row4[29])
            f.push(row4[30])
            f.push(row4[31])
            f.push(row4[32])
            f.push(row4[33])
            f.push(row4[34])
            f.push(row4[35])
            f.push(row4[36])
            f.push(row4[37])
            f.push(row4[38])
            f.push(row4[39])
            f.push(row4[40])
            f.push(row4[41])
            f.push(row4[42])
            f.push(row4[43])
            f.push(row4[44])
            f.push(row4[45])
            f.push(row4[46])
            f.push(row4[47])
            f.push(row4[48])
            f.push(row4[49])
            f.push(row4[50])
            f.push(row4[51])
            f.push(row4[52])
            f.push(row4[53])
            f.push(row4[54])
            f.push(row4[55])
            f.push(row4[56])
            f.push(row4[57])
            f.push(row4[58])
            f.push(row4[59])
            f.push(row4[60])
            f.push(row4[61])
            f.push(row4[62])
            f.push(row4[64])
            f.push(row4[63])
            f.push(row4[66])
            f.push(row4[65])
            f.push(row4[58])
            f.push(row4[67])
            f.push(row4[70])
            f.push(row4[69])
            f.push(row4[72])
    
    
            row[0].cities = a
            row[1].cities = b
            row[2].cities = c
            row[3].cities = d
            row[4].cities = e
            row[5].cities = f
           
        //    for(let i=0; i<row3.length; i++){
        //     var abb = '+'
        //     row3[i].country_code = abb.concat(row3[i].country_code)
        // }
      
            return ({
                countries: row,
                speciality: row1,
                workplace_type: row2,
                workplace_sector: row5,
                contry_code: row3,
                cities: row4,
                salutation: rowsalu
            })
        
        }
    }

    async signupPost(userSignup){
        var uniqid = (prefix = "", random = false, length = false) => {
            let id = ''
            if (length) {
                id = Math.random().toString().substr(2, 6)
            } else {
                const sec = Date.now() * 1000 + Math.random() * 1000;
                id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
            }
            return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
        };
        const pass = hashPassword(userSignup.password)
        const finduser = await this.DB.Models['User'].findAll({
            attributes: ['email'],
            where: [{ email: userSignup.email, platform_id: userSignup.platform_id }]
        })
        console.log(finduser)
        if (finduser.length>0) {
            return ({
                status: false,
                message: 'A user already exist with this emailk'
            })
        }
        else  {
            let token = uniqid('', false, true);
            console.log(token)
            const createuser = await this.DB.Models['User'].create({
                first_name: userSignup.first_name, last_name: userSignup.last_name, email: userSignup.email, password: pass, description: userSignup.country, department: userSignup.speciality, positon: userSignup.workplace_type, linkedin: userSignup.workplace_sector, phone: userSignup.country_code, city: userSignup.city, role_id: 3, status: 0, salutation: userSignup.salutation, platform_id: userSignup.platform_id, phone_number: userSignup.phone_number, workplace_name: userSignup.workplace_name, signup_verification_token: token,
            })
            if (createuser) {
                const sendemail = await this.mailService.sendMail({
                    from: "Giisty",
                    to: userSignup.email,
                    subject: "Account Verification Email",
                    template: 'inspiresignup',
                    context: {
                        signup_verification_token:token
                    }
                })
                if (sendemail) {
                    return ({
                        status: true,
                        message: 'success',
                        user: 'inserted'
                    })
                }
                else {
                    return ({
                        status: false,
                        message: 'error sending verification email.',
                        user: 'not inserted'
                    })
                }
            }
            else {
                return ({
                    status: false,
                    message: 'fail',
                    user: 'not inserted'
                })
            }
        
    }
        
    
    }

    async reverify(email:string,platform_id:number){
        var uniqid = (prefix = "", random = false, length = false) => {
            if (length) {
                let id = Math.random().toString().substr(2, 6)
            } else {
                const sec = Date.now() * 1000 + Math.random() * 1000;
                let id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
            }
            let id: any
            return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
        };
        const finduser = await this.DB.Models['User'].findAll({
            attributes: ['email'],
            where: [{ email: email, platform_id: platform_id }]
        })

        if (finduser) {
            let signup_verification_token = uniqid('', false, true);
            const update = await this.DB.Models['User'].update({
                signup_verification_token: signup_verification_token
            },
                {
                    where: [{ email: email, platform_id: platform_id }]
                })
            if (update) {
                let token = uniqid('', false, true);
                const sendemail = await this.mailService.sendMail({
                    from: "Giisty",
                    to: email,
                    subject: "Account Verification Email",
                    template: 'reverify',
                    context: {
                        id:token
                    }
                })
                if (sendemail) {
                    return ({
                        status: true,
                        message: 'success',
                        user: 'Token Sent',
                    })
                }
                else {
                    return ({
                        status: false,
                        message: 'error sending verification email.',
                        user: 'not inserted'
                    })
                }
            }
            else {
                return ({
                    status: false,
                    message: 'Something Went Wrong.'
                })
            }
        }
        else {
            return ({
                status: false,
                message: 'Invalid Email'
            })
        }
    }
    async inspireVerify(email:string,platform_id:number,signup_verification_token: string){
        const getUser = await this.DB.Models['User'].findOne({
            attributes: ['email','signup_verification_token'],
            where: [{ email: email, platform_id: platform_id }]
        })
        if (getUser.signup_verification_token===signup_verification_token) {
            const updateUser = await this.DB.Models['User'].update({
                status: 1
            },
                {
                    where: [{ email: email, platform_id: platform_id }]
                })
            if (updateUser) {
                return ({
                    status: true,
                    message: 'Account Activated.'
                })
            }
            else {
                return ({
                    status: false,
                    message: 'Something Went Wrong.'
                })
            }
        }
        else {
            return ({
                status: false,
                message: 'Invalid Verification Token'
            })
        }
    }

}