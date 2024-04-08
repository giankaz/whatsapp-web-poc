import { BadGatewayException, Injectable } from '@nestjs/common'
import { sleep } from '../utils/sleep'
import { Client, LocalAuth } from 'whatsapp-web.js'

export class WhatsappProvider {
  public client: Client

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth()
    })
  }

  public isReady = false

  initialize({
    onQr,
    onReady
  }: {
    onQr: (qr: string) => void
    onReady: () => void
  }) {
    this.client.on('qr', (qr) => {
      onQr(qr)
    })

    this.client.on('ready', () => {
      onReady()
      this.isReady = true
    })

    this.client.on('authenticated', (session) => {
      console.log(session)
    })

    this.client.initialize()
  }

  close() {
    try {
      this.client.destroy()
    } catch {
      //
    }
  }

  async sendMessages(numbers: string[], message: string) {
    if (!this.isReady) {
      throw new BadGatewayException('You must initialize the whatsapp client')
    }

    let start = 0

    for (const number of numbers) {
      const chatId = number.replace('+', '') + '@c.us'

      this.client.sendMessage(chatId, message)

      start++

      if (start >= 10) {
        await sleep()
        start = 0
      }
    }
  }
}
