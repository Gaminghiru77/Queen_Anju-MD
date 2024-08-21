const {cmd , commands} = require('../command')
const puppeteer = require('puppeteer');
const { writeFile } = require('fs').promises;
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "fb",
    desc: "To download Facebook videos.",
    react: "💠",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply('Please provide a valid Facebook video URL.');
        reply('Fetching video, please wait...');
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(q, { waitUntil: 'networkidle2' });
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            return videoElement ? videoElement.src : null;
        });

        await browser.close();

        if (!videoUrl) return reply('Failed to fetch video. Please check the URL and try again.');

        // Define video file name and path
        const videoTitle = path.basename(videoUrl).split('?')[0]; // Using the video URL to derive a name
        const videoFile = `./temp/${videoTitle}`;

        // Download the video
        const videoStream = fs.createWriteStream(videoFile);
        const videoResponse = await fetch(videoUrl);

        if (videoResponse.ok) {
            videoResponse.body.pipe(videoStream);
            videoResponse.body.on('end', async () => {
                await conn.sendMessage(from, { video: { url: videoFile }, caption: `*Downloaded:* ${videoTitle}` }, { quoted: mek });
                fs.unlinkSync(videoFile); // Clean up the file after sending
            });
        } else {
            reply('Failed to download video.');
        }

    } catch (err) {
        console.error(err);
        reply('An error occurred while fetching the video.');
    }
});
