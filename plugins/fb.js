const { WAConnection, MessageType, Presence, Mimetype, Reactions } = require('@whiskeysockets/baileys');
const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const fbDownloader = require('fb-downloader-new')
cmd({
    pattern: "fb",
    desc: "To download Facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please provide a Facebook video URL.")  
const result = await fbDownloader(q);
        if (!result.success) {
            return reply("Failed to download the video.");
        }

        const videoTitle = result.title.replace(/[^a-zA-Z0-9]/g, '_');
        const videoUrl = result.download.hd || result.download.sd;

        let desc = `
⫷⦁[ * '-'_꩜ 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 𝘍𝘉 𝘝𝘐𝘋𝘌𝘖 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋𝘌𝘙 ꩜_'-' * ]⦁⫸

*I found this video...*

 ➥ Title: ${result.title}
 ➥ URL: ${q}
 ➥ Duration: ${result.duration}
 ➥ Views: ${result.views}
 ➥ Uploaded: ${result.uploaded}

> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
> *GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//send audio message
await conn.sendMessage(from, { video: { url: videoUrl }, mimetype: "video/mp4" }, { quoted: mek })
await conn.sendMessage(from, {
                document: { url: videoUrl },
                mimetype: "video/mp4",
                fileName: `${videoTitle}.mp4`,
                caption: "*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"
            }, { quoted: mek })
}catch(e){
console.log(e)
  reply('${e}')
}
})
