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
    if(!q) return reply("Please give me a url or title")
    const search = await fbdl(q)
    const data = search.videos[0];
    const url = data.url
    
//download video

let down = await fg.fbdl(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek});


}catch(e){
console.log(e)
  reply(`${e}`)
}
})
