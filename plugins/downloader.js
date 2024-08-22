const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const { fbdl } = require('ruhend-scraper');
cmd({
    pattern: "fb",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix+command} https://www.facebook.com/reel/3677168492551989?mibextid=rS40aB7S9Ucbxw6v`);
      let res = await fbdl(q);
      let result = res.data;
      let data;
      try {
         data = result.find(i => i.resolution === "720p (HD)");
         m.reply(`Data Found!`);       
      } catch {
         m.reply(`HD not found switch to SD`);
         data = result.find(i => i.resolution === "360p (SD)")
      }
      let video = data.url      
      conn.adReply(m.chat, m).then(() => {
         conn.sendFile(m.chat, video, {
            caption: `𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊`,
            quoted: m
         });
      });

}catch(e){
console.log(e)
  reply('${e}')
}
})
