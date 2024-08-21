const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "ping",
    alias: ["pong"],
    desc: "To Check uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

var inital = new Date().getTime();
await reply('```🔴Pinging!!!```');

var final = new Date().getTime();
return await reply('*✅Pong*\n *' + (final - inital) + ' ms* ');

    
}catch(e){
console.log(e)
reply(`${e}`)

}
})
