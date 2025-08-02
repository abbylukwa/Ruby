const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const TARGET_NUMBER = "+2635156210";
const COUNTRY_CODE = "263";
const PREFIX = "Your session ID is: ";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

function generateSessionId() {
    return 'ABBY-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Abby bot is ready!');
    
    const sessionId = generateSessionId();
    const message = PREFIX + sessionId;
    
    const formattedNumber = TARGET_NUMBER.startsWith(COUNTRY_CODE) 
        ? TARGET_NUMBER.substring(COUNTRY_CODE.length) 
        : TARGET_NUMBER;
    
    const chatId = formattedNumber + "@c.us";
    
    client.sendMessage(chatId, message)
        .then(() => console.log(`Session ID sent: ${sessionId}`))
        .catch(err => console.error('Error sending message:', err));
});


client.initialize();
