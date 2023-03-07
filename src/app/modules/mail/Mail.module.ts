
import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({})
export class MailModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: MailModule,
      imports: [
        MailerModule.forRoot({
          transport: {
            service: "gmail",
            host: "smtp.gmail.com",
            secure: false,
            auth: {
              user: "devteam@giisty.com",
              pass: "Giisty2020.",
            },
            tls: {
              rejectUnauthorized: false
            }
          },
          defaults: {
            from: "devteam@giisty.com",
          },
          template: {
            dir: process.cwd()+'/src/app/resources/views/mail',
            adapter: new HandlebarsAdapter(undefined, {
              inlineCssEnabled: true,
              inlineCssOptions: {
                url: ' ',
                preserveMediaQueries: true,
              },
            }),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: process.cwd()+'/src/app/resources/views/partials',
              options: {
                strict: true,
              },
            },
          },
        })
      ],
    };
  }
}