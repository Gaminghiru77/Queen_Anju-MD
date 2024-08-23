const { cmd } = require('../command');
const { conn } = require('../config');  // Make sure you have the proper connection setup
const {config} = require('../config');

if (config.AUTO_VOICE) {
// Voice message URLs
const voiceMessages = {
    palayan: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_palayan.mp3',
    bye: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_Bye.mp3',
    gm: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_Gm.mp3',
    hi: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_Hi.mp3',
    gn: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_Gn.mp3',
    hmm: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_Hmm.mp3'
};

// Function to send voice message
async function sendVoice(conn, chatId, voiceUrl) {
    try {
        await conn.sendMessage(chatId, { audio: { url: voiceUrl }, mimetype: 'audio/ogg; codecs=opus' });
    } catch (error) {
        console.error('Error sending voice message:', error);
    }
}

// Command handlers for sending voice messages
cmd({
    pattern: "palayan",
    desc: "Send the palayan voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.palayan);
});

cmd({
    pattern: "bye",
    desc: "Send the bye voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.bye);
});

cmd({
    pattern: "gm",
    desc: "Send the good morning voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.gm);
});

cmd({
    pattern: "hi",
    desc: "Send the hi voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.hi);
});

cmd({
    pattern: "gn",
    desc: "Send the good night voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.gn);
});

cmd({
    pattern: "hmm",
    desc: "Send the hmm voice message.",
    category: "media",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    await sendVoice(conn, from, voiceMessages.hmm);
});
}
