const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "about",
    desc: "To get the bot informations.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,senderName, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let about = ` HELLOW THEIR ${senderName} I AM QUEEN_ANJU WHATSAPP BOT 
              CREATED BY GAMING RASH(JANITH RASHMIKA)..
              
              > *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
              > *ɢɪᴛʜᴜʙ :* github.com/Mrrashmika/Queen_Anju-MD
              
              THANKS FOR USING QUEEN ANJU WHATSAPP BOT MD`
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption:about},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})


