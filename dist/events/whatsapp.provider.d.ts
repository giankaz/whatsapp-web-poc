import { Client } from 'whatsapp-web.js';
export declare class WhatsappProvider {
    client: Client;
    constructor();
    isReady: boolean;
    initialize({ onQr, onReady }: {
        onQr: (qr: string) => void;
        onReady: () => void;
    }): void;
    close(): void;
    sendMessages(numbers: string[], message: string): Promise<void>;
}
