const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "media",
    desc: "To download songs or videos.",
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

        // Create the list message
        const sections = [
            {
                title: "Select Media Type",
                rows: [
                    { title: "Download Song", rowId: `song_${url}` },
                    { title: "Download Video", rowId: `video_${url}` }
                ]
            }
        ];

        const listMessage = {
            text: "Please choose what you want to download:",
            footer: "Powered by Queen Anju",
            title: "Media Download Options",
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

// Handle the list response
cmd({
    pattern: "song_",
    desc: "Download the selected song.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = command.replace('song_', '');

        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send audio message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: down.title + ".mp3", caption: "*© Queen Anju WhatsApp Bot*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "video_",
    desc: "Download the selected video.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = command.replace('video_', '');

        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Send video message
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: down.title + ".mp4", caption: "*© Queen Anju WhatsApp Bot*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
