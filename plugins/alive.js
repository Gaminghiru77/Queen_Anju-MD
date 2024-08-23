const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "alive",
    desc: "To Check the bot online or no.",
    react: "🟢",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const voice = {
    alive: 'https://github.com/Mrrashmika/Queen_Anju-MD/raw/main/media/media_alive.mp3'
}

let aliveMessage = ` 
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 ꩜_'-' * ]⦁⫸ 

*Hey there!* 

 > 🟢 *Queen Anju WhatsApp Bot* is up and running!
           Runtime : ${runtime(process.uptime())}
 > 🛠️ *Created by:* Janith Rashmika 
 
*Here's what I can do:* 
💿 *Download Songs & Videos* 
📰 *Fetch Latest News* 
🎭 *Entertain with Fun Commands* 
🔧 *Manage Groups* 

> *Stay connected and enjoy the services!* 


*© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD `
await conn.sendVoice(conn, from, voice.alive)
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption:aliveMessage},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})



