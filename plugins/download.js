const { bot, mode, isUrl, getBuffer, getJson, validateQuality } = require('../lib')
const { Facebook, Instagram } = require('../lib/Misc')
const { Twitter } = require('../lib/Misc/scraper')
const { ytsdl } = require('../lib/ytdl')
bot(
 {
  pattern: 'facebook',
  info: 'Download Facebook Media',
  type: 'download',
 },
 async (message, match) => {
  if (!match) return await message.reply('_Provide Facebook link!_')
  await message.reply('processing')
  const facebook = new Facebook(match)
  const hdVideo = await facebook.getHdVideo()
  await message.send(hdVideo, {}, 'video')
 }
)

bot(
 {
  pattern: 'instagram',
  info: 'Download Instagram Media',
  type: 'download',
 },
 async (message, match) => {
  if (!match) return await message.reply('_Provide Instagram Link!_')
  await message.reply('_Downloading_')
  const insta = new Instagram()
  const result = await insta.download(match)
  await message.send(result, {}, 'video')
 }
)

bot(
 {
  pattern: 'twitter',
  info: 'Downloads twitter media',
  type: 'download',
 },
 async (message, match) => {
  if (!match) return await message.sendReply('_provide x url_')
  await message.sendReply('_Downloading_')
  const twitter = new Twitter()
  const result = await twitter.download(match)
  await message.send(result, {}, 'video')
 }
)

bot(
 {
  pattern: 'yta',
  fromMe: mode,
  desc: 'Download audio from youtube',
  type: 'download',
 },
 async (message, match) => {
  match = match || message.reply_message.text
  if (!match) return await message.reply('Give me a youtube link')
  if (!isUrl(match)) return await message.reply('Give me a youtube link')
  let { dlink, title } = (await getJson(`https://api.thexapi.xyz/api/v1/download/youtube/audio?url=${match}`)).data
  await message.reply(`_Downloading ${title}_`)
  let buff = await getBuffer(dlink)
  return await message.sendMessage(
   message.jid,
   buff,
   {
    mimetype: 'audio/mpeg',
    filename: title + '.mp3',
   },
   'audio'
  )
 }
)

bot(
 {
  pattern: 'ytv',
  fromMe: mode,
  desc: 'Download audio from youtube',
  type: 'download',
 },
 async (message, match) => {
  match = match || message.reply_message.text
  let url = getUrl(match)[0]
  if (!url) return await message.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  let quality = match.split(';')[1]
  if (quality && !validateQuality(quality)) {
   return await message.reply('Invalid Resolution \nSupported: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p')
  } else if (!quality) quality = '360p'
  if (!match) return await message.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  if (!isUrl(match)) return await message.reply('Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p')
  let requrl = `https://api.thexapi.xyz/api/v1/download/youtube/video?url=${url}&quality=${quality}`
  let response = (await getJson(requrl)).data
  const { dlink, title } = response
  console.log(response)
  await message.reply(`_Downloading ${title}_`)
  return await message.sendMessage(
   message.jid,
   dlink,
   {
    mimetype: 'video/mp4',
    filename: title + '.mp4',
   },
   'video'
  )
 }
)

bot(
 {
  pattern: 'song',
  fromMe: mode,
  desc: 'Download audio from youtube',
  type: 'download',
 },
 async (message, match) => {
  match = match || message.reply_message.text
  if (!match) return await message.reply('Give me a query')
  let { dlink, title } = await ytsdl(match)
  await message.reply(`_Downloading ${title}_`)
  let buff = await getBuffer(dlink)
  return await message.sendMessage(
   message.jid,
   buff,
   {
    mimetype: 'audio/mpeg',
    filename: title + '.mp3',
   },
   'audio'
  )
 }
)

bot(
 {
  pattern: 'video',
  fromMe: mode,
  desc: 'Download video from youtube',
  type: 'download',
 },
 async (message, match) => {
  match = match || message.reply_message.text
  if (!match) return await message.reply('Give me a query')
  let { dlink, title } = await ytsdl(match, 'video')
  await message.reply(`_Downloading ${title}_`)
  return await message.sendMessage(
   message.jid,
   dlink,
   {
    mimetype: 'video/mp4',
    filename: title + '.mp4',
   },
   'video'
  )
 }
)
