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
    return reply(m.chat, '*`Error download video.`*', m);
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
});
