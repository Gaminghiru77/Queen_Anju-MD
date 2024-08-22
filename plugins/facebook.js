const {cmd , commands} = require('../command');
const { igdl } = require('ruhend-scraper');

cmd({
    pattern: "fb",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!args[0]) {
    return reply(m.chat, '*`Please give a waild Facebook link`*', m);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply(m.chat, '*`Error obtaining data.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply(m.chat, '*`No resalt found.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply(m.chat, '*`Error data loss.`*', m);
  }

  if (!data) {
    return reply(m.chat, '*`No data found.`*', m);
  }

  await m.react('✅');
  let video = data.url;
  let dev = '© 2024 Queen Anju FB Downloader | Download with ease, cherish forever.'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply(m.chat, '*`Error al enviar el video.`*', m);
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
});

cmd({
    pattern: "ig",
    desc: "To download instagrame videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 if (!args[0]) {
        return conn.reply(m.chat, '*`Please give a waild instagrame link`*', m, fake);
    }
    
    try {
        await m.react('🕑');
        
        let res = await igdl(args[0]);
        let data = res.data; 
        
        for (let media of data) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            await m.react('✅');
            await conn.sendFile(m.chat, media.url, 'instagram.mp4', dev, null, m); 
        }
    } catch {
        await m.react('❌');
  }

}catch(e){
console.log(e)
  reply(`${e}`)
}
});
