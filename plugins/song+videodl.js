const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "song",
    desc: "To download songs.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = '😗 *QUEEN_ANJU SONG DOWNLOADER* 😗/n/ntitle: ${data.title}/n/ndescription: ${data.description}/n/ntime: ${data.timestamp}/n/nago: ${data.ago}/n/nviews: ${data.views}/n/nㅤ/n/nㅤ/n/n©⁜POWERED BY GAMING RASH©⁜'

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})


}catch(e){
console.log(e)
  reply('${e}')
}
})
