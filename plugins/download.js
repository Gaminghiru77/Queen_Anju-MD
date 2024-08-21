const { bot, mode, isUrl, getBuffer, getJson, validateQuality } = require('../lib')
const { Facebook, Instagram } = require('../lib/social')
const { Twitter } = require('../lib/social/scraper')
const { ytsdl } = require('../lib/ytdl')
bot(
cmd({
    pattern: "fb",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await message.reply('_Provide Facebook link!_')
  await conn.reply('processing')
  const facebook = new Facebook(q)
  const hdVideo = await facebook.getHdVideo()
  await conn.send(hdVideo, {}, 'video')
 }
)

cmd({
    pattern: "insta",
    desc: "To download instagrame.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await conn.reply('_Provide Instagram Link!_')
  await message.reply('_Downloading_')
  const insta = new Instagram()
  const result = await insta.download(q)
  await conn.send(result, {}, 'video')
 }
)

cmd({
    pattern: "twi",
    desc: "To download twitter.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await conn.sendReply('_provide x url_')
  await conn.sendReply('_Downloading_')
  const twitter = new Twitter()
  const result = await twitter.download(q)
  await conn.send(result, {}, 'video')
 }
)

cmd({
    pattern: "yta",
    desc: "To download youtube audio.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  q = q || conn.reply_message.text
  if (!q) return await conn.reply('Give me a youtube link')
  if (!isUrl(q)) return await conn.reply('Give me a youtube link')
  let { dlink, title } = (await getJson(`https://api.thexapi.xyz/api/v1/download/youtube/audio?url=${q}`)).data
  await conn.reply(`_Downloading ${title}_`)
  let buff = await getBuffer(dlink)
  return await conn.sendMessage(
   conn.jid,
   buff,
   {
    mimetype: 'audio/mpeg',
    filename: title + '.mp3',
   },
   'audio'
  )
 }
)

cmd({
    pattern: "ytv",
    desc: "To download youtube videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  q = q || conn.reply_message.text
  let url = getUrl(q)[0]
  if (!url) return await conn.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  let quality = q.split(';')[1]
  if (quality && !validateQuality(quality)) {
   return await conn.reply('Invalid Resolution \nSupported: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p')
  } else if (!quality) quality = '360p'
  if (!q) return await conn.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  if (!isUrl(q)) return await conn.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  let requrl = `https://api.thexapi.xyz/api/v1/download/youtube/video?url=${url}&quality=${quality}`
  let response = (await getJson(requrl)).data
  const { dlink, title } = response
  console.log(response)
  await conn.reply(`_Downloading ${title}_`)
  return await conn.sendMessage(
   conn.jid,
   dlink,
   {
    mimetype: 'video/mp4',
    filename: title + '.mp4',
   },
   'video'
  )
 }
)

