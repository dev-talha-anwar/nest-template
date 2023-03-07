import { Module, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketGateway } from "../../services/gateways/Socket.gateway";
import { ModuleHelper } from '../../utils/helpers/Module.helper';
import { ServiceHelper } from '../../utils/helpers/Service.helper';

@Global()
@Module({
    imports: ModuleHelper,
    providers: [SocketGateway, ...ServiceHelper, JwtService],
    exports: [
        SocketGateway
    ]
})
export class SocketModule {}