const { cmd, commands } = require('../command');
const fg = require('api-dylux'); // This assumes api-dylux supports Facebook video downloads
const yts = require('yt-search');

// Facebook Video Downloader
cmd({
    pattern: "fb",
    desc: "To download Facebook videos.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a Facebook video URL");

        // Validate the URL format (Optional)
        if (!q.includes("facebook.com")) return reply("Please provide a valid Facebook video URL");

        // Fetch video download link
        let down = await fg.fb(q);
        let downloadUrl = down.dl_url;
        let title = down.title || "Facebook Video";

        let desc = `
⫷⦁[ * '-'_꩜ 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 𝘍𝘉 𝘝𝘐𝘋𝘌𝘖 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋𝘌𝘙 ꩜_'-' * ]⦁⫸
        
*ɪ ꜰᴏᴜɴᴅ ᴛʜɪꜱ ʀᴇꜱᴜʟᴛ...*

 ➥ ᴛɪᴛʟᴇ -  ${title}

 ➥ ᴜʀʟ - : ${q}


> *© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*
> *ɢɪᴛʜᴜʙ :* github.com/Mrrashmika/Queen_Anju-MD
`;

        // Send video details
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Send video message
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4", caption: `*© Queen Anju WhatsApp Bot - MD*` }, { quoted: mek });

        // Optionally, you can send it as a document
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${title}.mp4`, caption: "*© Queen Anju WhatsApp Bot - MD*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
