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
    return reply(m.chat, '*`INGRESA EL LINK DE FACEBOOK`*', m);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply(m.chat, '*`Error al obtener datos. Verifica el enlace.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply(m.chat, '*`No se encontraron resultados.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply(m.chat, '*`Error al procesar los datos.`*', m);
  }

  if (!data) {
    return reply(m.chat, '*`No se encontró una resolución adecuada.`*', m);
  }

  await m.react('✅');
  let video = data.url;
  let dev = '😇'
  
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
