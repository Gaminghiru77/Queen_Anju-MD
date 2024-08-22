const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "menu",
    desc: "To get the menu.",
    react: "😚",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let menuMessage = ` 
 

*🌟👑 𝗤𝘂𝗲𝗲𝗻_𝗔𝗻𝗷𝘂 𝗠𝗗 - 𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂 👑🌟*

*✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗤𝘂𝗲𝗲𝗻_𝗔𝗻𝗷𝘂! ✨*

*📊 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:*
- ⏳ *𝗥𝘂𝗻𝘁𝗶𝗺𝗲:* ${runtime(process.uptime())}
- 👤 *𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲:* 𝗝𝗮𝗻𝗶𝘁𝗵 𝗥𝗮𝘀𝗵𝗺𝗶𝗸𝗮
- 📞 *𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿:* ${config.BOT_NUMBER}

*📥 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗠𝗲𝗻𝘂:*
- 🎵 '.song' - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗮 𝘀𝗼𝗻𝗴
- 🎥 '.video' - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗮 𝘃𝗶𝗱𝗲𝗼
- 🌐 '.tt' - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗧𝗶𝗸𝗧𝗼𝗸 𝘃𝗶𝗱𝗲𝗼𝘀
- 📘 '.fb' - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝘃𝗶𝗱𝗲𝗼𝘀
- 📸 '.ig' - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺 𝗰𝗼𝗻𝘁𝗲𝗻𝘁

*🔧 𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂:*
- 🟢 '.alive' - 𝗖𝗵𝗲𝗰𝗸 𝗶𝗳 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗶𝘀 𝗮𝗰𝘁𝗶𝘃𝗲
- 📜 '.menu' - 𝗩𝗶𝗲𝘄 𝘁𝗵𝗶𝘀 𝗺𝗲𝗻𝘂
- ℹ️ '.about' - 𝗟𝗲𝗮𝗿𝗻 𝗮𝗯𝗼𝘂𝘁 𝘁𝗵𝗲 𝗯𝗼𝘁
- 💻 '.system' - 𝗩𝗶𝗲𝘄 𝘀𝘆𝘀𝘁𝗲𝗺 𝗶𝗻𝗳𝗼
- ⏱ '.runtime' - 𝗖𝗵𝗲𝗰𝗸 𝗯𝗼𝘁 𝗿𝘂𝗻𝘁𝗶𝗺𝗲
- 📶 '.ping' - 𝗖𝗵𝗲𝗰𝗸 𝘁𝗵𝗲 𝗯𝗼𝘁'𝘀 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝘁𝗶𝗺𝗲

*🤖 𝗔𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲 𝗠𝗲𝗻𝘂:*
- 🧠 '.ai' - 𝗔𝗰𝗰𝗲𝘀𝘀 𝗔𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲 𝗳𝗲𝗮𝘁𝘂𝗿𝗲𝘀

*👥 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂:*
- ⬆️ '.promote' - 𝗣𝗿𝗼𝗺𝗼𝘁𝗲 𝗮 𝘂𝘀𝗲𝗿 𝘁𝗼 𝗮𝗱𝗺𝗶𝗻
- ⬇️ '.demote' - 𝗗𝗲𝗺𝗼𝘁𝗲 𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝘁𝗼 𝘂𝘀𝗲𝗿
- ➕ '.add' - 𝗔𝗱𝗱 𝗮 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽
- ➖ '.remove' - 𝗥𝗲𝗺𝗼𝘃𝗲 𝗮 𝗺𝗲𝗺𝗯𝗲𝗿 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽
- 📸 '.getpic' - 𝗚𝗲𝘁 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽'𝘀 𝗽𝗿𝗼𝗳𝗶𝗹𝗲 𝗽𝗶𝗰𝘁𝘂𝗿𝗲

*🎉 𝗙𝘂𝗻 𝗠𝗲𝗻𝘂:*
- 📚 '.fact' - 𝗚𝗲𝘁 𝗮 𝗿𝗮𝗻𝗱𝗼𝗺 𝗳𝗮𝗰𝘁

*🔍 𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂:*
- ☁️ '.weather' - 𝗖𝗵𝗲𝗰𝗸 𝘁𝗵𝗲 𝘄𝗲𝗮𝘁𝗵𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻



*© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD `;
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption:menuMessage},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})


