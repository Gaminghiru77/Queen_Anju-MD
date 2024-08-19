const { cmd, commands } = require('../command');
const fbDownloader = require('fb-downloader-new');

// Facebook Video Downloader Command
cmd({
    pattern: "fbvideo",
    desc: "To download Facebook videos.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a Facebook video URL.");

        const videoUrl = q.trim();

        // Fetch video details
        const videoData = await fbDownloader(videoUrl);

        if (!videoData || (!videoData.sd && !videoData.hd)) {
            return reply("Failed to fetch video details or the video may be private.");
        }

        const { title, thumbnail, hd, sd } = videoData;

        let desc = `
⫷⦁[ * '-'_꩜ Facebook Video Downloader ꩜_'-' * ]⦁⫸

*Here are the details of the video:*

 ➥ *Title* - ${title || "Unknown"}
 ➥ *HD URL* - ${hd || "Not available"}
 ➥ *SD URL* - ${sd}

> *© Your WhatsApp Bot*
`;

        await conn.sendMessage(from, { image: { url: thumbnail }, caption: desc }, { quoted: mek });

        // Send video message (HD if available, otherwise SD)
        let downloadUrl = hd || sd;

        if (downloadUrl) {
            await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4", caption: `*© Your WhatsApp Bot*` }, { quoted: mek });
        } else {
            reply("Failed to download the video.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
