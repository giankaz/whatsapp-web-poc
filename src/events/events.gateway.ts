/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { WhatsappProvider } from './whatsapp.provider'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  private logger = new Logger(EventsGateway.name)

  public wpp: WhatsappProvider

  @WebSocketServer()
  server: Server

  handleConnection(client: any) {
    this.wpp = new WhatsappProvider()

    this.wpp.initialize({
      onQr: (qr) => this.server.emit('qr', qr),
      onReady: () => this.server.emit('ready', true)
    })
  }

  handleDisconnect(client: any) {
    this.wpp.close()
  }

  @SubscribeMessage('send')
  async findAll(@MessageBody() data: { numbers: string[]; message: string }) {
    return await this.wpp.sendMessages(data.numbers, data.message)
  }


  @SubscribeMessage('send-img')
  async sendImg(@MessageBody() data: { numbers: string[]; message: string }) {
    return await this.wpp.sendMessages(data.numbers, data.message)
  }
}
