"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappProvider = void 0;
const common_1 = require("@nestjs/common");
const sleep_1 = require("../utils/sleep");
const whatsapp_web_js_1 = require("whatsapp-web.js");
class WhatsappProvider {
    constructor() {
        this.isReady = false;
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth()
        });
    }
    initialize({ onQr, onReady }) {
        this.client.on('qr', (qr) => {
            onQr(qr);
        });
        this.client.on('ready', () => {
            onReady();
            this.isReady = true;
        });
        this.client.on('authenticated', (session) => {
            console.log(session);
        });
        this.client.initialize();
    }
    close() {
        try {
            this.client.destroy();
        }
        catch (_a) {
        }
    }
    async sendMessages(numbers, message) {
        if (!this.isReady) {
            throw new common_1.BadGatewayException('You must initialize the whatsapp client');
        }
        let start = 0;
        for (const number of numbers) {
            const chatId = number.replace('+', '') + '@c.us';
            this.client.sendMessage(chatId, message);
            start++;
            if (start >= 10) {
                await (0, sleep_1.sleep)();
                start = 0;
            }
        }
    }
}
exports.WhatsappProvider = WhatsappProvider;
//# sourceMappingURL=whatsapp.provider.js.map