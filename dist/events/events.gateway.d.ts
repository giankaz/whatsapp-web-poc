import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WhatsappProvider } from './whatsapp.provider';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    private logger;
    wpp: WhatsappProvider;
    server: Server;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    findAll(data: {
        numbers: string[];
        message: string;
    }): Promise<void>;
    sendImg(data: {
        numbers: string[];
        message: string;
    }): Promise<void>;
}
