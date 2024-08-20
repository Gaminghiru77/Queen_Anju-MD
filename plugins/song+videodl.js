const { WAConnection, MessageType, Mimetype } = require('@whiskeysockets/baileys');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "To download songs.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");
        
        // Perform YouTube search
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        // Construct the message description
        let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸

🎵 *Song Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 

> *Created with ❤️ by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

        // Send the song information
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Create buttons for audio and document download
        const buttons = [
            { buttonId: 'audio', buttonText: { displayText: '🎧 Audio File' }, type: 1 },
            { buttonId: 'document', buttonText: { displayText: '📄 Document File' }, type: 1 }
        ];

        const buttonMessage = {
            contentText: 'Please select how you would like to download the song:',
            footerText: 'Queen Anju Bot',
            buttons: buttons,
            headerType: 1
        };

        // Send the button message
        await conn.sendMessage(from, buttonMessage, MessageType.buttonsMessage);

        // Handle the user's selection
        const collected = await conn.waitForMessage({ quoted: mek });

        const selectedButtonId = collected.message?.buttonsResponseMessage?.selectedButtonId;

        if (!selectedButtonId) {
            return reply("No option selected. Please try again.");
        }

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        if (selectedButtonId === 'audio') {
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (selectedButtonId === 'document') {
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "audio/mpeg",
                fileName: data.title + ".mp3",
                caption: "*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"
            }, { quoted: mek });
        } else {
            reply("Invalid option selected.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
