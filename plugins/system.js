const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {Function,runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "To Check uptime , ram and more.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `
🏷️ SYSTEM STATUS

🔄 UPTIME: ${runtime(process.uptime())}
🔋 RAM USAGE: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
💻 HOST NAME: ${os.hostname()}
👑 BOT OWNER: Janith Rashmika
`
return reply(`${status}`)
}catch(e){
console.log(e)
reply(`${e}`)

}
})


cmd({
    pattern: "runtime",
    alias: ["uptime"],
    desc: "To Check uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `😇𝚁𝚄𝙽𝚃𝙸𝙼𝙴😇:  ${runtime(process.uptime())}`


return reply(`${status}`)
}catch(e){
console.log(e)
reply(`${e}`)

}
})


cmd({
    pattern: 'ping',
    desc: 'Replies with Pong! and the response time.',
    category: 'general',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
        // Record the start time
        const startTime = Date.now();

        // Send a temporary message to measure response time
        await conn.sendMessage('Pinging...');

        // Record the end time
        const endTime = Date.now();
        
        // Calculate the response time
        const responseTime = endTime - startTime;

        // Send the response time
        await conn.sendMessage(`Pong! Response time: ${responseTime} ms`);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

