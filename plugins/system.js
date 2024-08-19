const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "To Check uptime , ram and more.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `*𝚁𝚄𝙽𝚃𝙸𝙼𝙴:*  ${runtime(process.uptime())}
              *𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
              *𝙷𝙾𝚂𝚃 𝙽𝙰𝙼𝙴:* ${os.hostname()}
              *𝙾𝚆𝙽𝙴𝚁:*  𝘗𝘳𝘢𝘣𝘢𝘵𝘩 𝘬𝘶𝘮𝘢𝘳𝘢 & 𝘑𝘢𝘯𝘪𝘵𝘩 𝘳𝘢𝘴𝘩𝘮𝘪𝘬𝘢 `
return reply(`${status}`)
}catch(e){
console.log(e)
reply(`${e}`)

}
})
