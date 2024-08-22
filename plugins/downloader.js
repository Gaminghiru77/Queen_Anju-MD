const {cmd , commands} = require('../command')
const { fbdl } = require('ruhend-scraper');

      
cmd({pattern: "fb",
    desc: "To download facebook videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await fbdl(q)
let result = search.data;
      let data;
      try {
         data = result.find(i => i.resolution === "720p (HD)");
         m.reply(`Data Found!`);       
      } catch {
         m.reply(`HD not found switch to SD`);
         data = result.find(i => i.resolution === "360p (SD)")
      }
      let video = data.url      
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.sendFile(m.chat, video, {
            caption: `𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊`,
            quoted: m
         });
      });
   },
});
    
