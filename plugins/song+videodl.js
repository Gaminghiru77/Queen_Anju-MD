const { default: useSingleFileAuthState, MessageType, MessageOptions, Mimetype } = require('@whiskeysockets/baileys');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');
const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "song",
    desc: "To download songs.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
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
sock.ev.on('messages.upsert', async (m) => {
        console.log(JSON.stringify(m, undefined, 2))

        const msg = m.messages[0];
        if (!msg.key.fromMe && m.type === 'notify') {
            if (msg.message.conversation === 'hi') {
                const buttons = [
                    { buttonId: 'id1', buttonText: { displayText: 'Audio File' }, type: 1 },
                    { buttonId: 'id2', buttonText: { displayText: 'Document File' }, type: 1 }
                ];

                const buttonMessage = {
                    text: "desc",
                    footer: `> *© Qᴜᴇᴇɴ ᴀɴᴊᴜ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
              > *ɢɪᴛʜᴜʙ :* github.com/Mrrashmika/Queen_Anju-MD`,
                    buttons: buttons,
                    headerType: 1
                };

                await sock.sendMessage(msg.key.remoteJid, buttonMessage);
            }
        }
    });
//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (msg.message.buttonsResponseMessage) {
        const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;
        if (buttonId === 'id1') {
            await sock.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek});
        } else if (buttonId === 'id2') {
            await sock.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"},{quoted:mek});
        }
    }
});
   
}
})
//====================video_dl=======================

cmd({
    pattern: "video",
    desc: "To download videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
⫷⦁[ * '-'_꩜ 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 𝘠𝘛 𝘝𝘐𝘋𝘌𝘖 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋𝘌𝘙 ꩜_'-' * ]⦁⫸
        
*ɪ ꜰᴏᴜɴ ᴛʜɪꜱ ʀᴇsᴜʟᴛ...*

 ➥ ᴛɪᴛʟᴇ -  ${data.title}

 ➥ ᴜʀʟ - : ${data.url}

 ➥ ᴅᴜʀᴀᴛɪᴏɴ - : ${data.timestamp}

 ➥ ᴠɪᴇᴡs - : ${data.views}

 ➥ ᴜᴘʟᴏᴀᴅ ᴏɴ - ${data.ago}


> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
> *ɢɪᴛʜᴜʙ :* github.com/Mrrashmika/Queen_Anju-MD
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`${e}`)
}
})
