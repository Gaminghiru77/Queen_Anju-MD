const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "To download a song.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title");

        // Search for the media based on the query
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
⫷⦁[ * '-'_꩜ 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 𝘠𝘛 𝘚𝘖𝘕𝘎 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋𝘌𝘙 ꩜_'-' * ]⦁⫸
        
*ɪ ꜰᴏᴜɴ ᴛʜɪꜱ ʀᴇsᴜʟᴛ...*

 ➥ ᴛɪᴛʟᴇ -  ${data.title}

 ➥ ᴜʀʟ - : ${data.url}

 ➥ ᴅᴜʀᴀᴛɪᴏɴ - : ${data.timestamp}

 ➥ ᴠɪᴇᴡs - : ${data.views}

 ➥ ᴜᴘʟᴏᴀᴅ ᴏɴ - ${data.ago}


> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
> *ɢɪᴛʜᴜʙ :* github.com/Mrrashmika/Queen_Anju-MD
`

        // Create the list message
        const sections = [
            {
                title: "Select Download Type",
                rows: [
                    { title: "Download as Audio", rowId: `audio_${url}` },
                    { title: "Download as Document", rowId: `document_${url}` }
                ]
            }
        ];

        const listMessage = {
            text:desc,
            footer: "Powered by Queen Anju",
            title: "Download Options",
            buttonText: "Select Option",
            sections: sections
        };

        // Send the list message to the user
        await conn.sendMessage(from, { listMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Handle the list response for audio
cmd({
    pattern: "audio_",
    desc: "Download the selected media as audio.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = command.replace('audio_', '');

        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send audio message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Handle the list response for document
cmd({
    pattern: "document_",
    desc: "Download the selected media as a document.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = command.replace('document_', '');

        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send document message
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: down.title + ".mp3", caption: "*© Queen Anju WhatsApp Bot*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
