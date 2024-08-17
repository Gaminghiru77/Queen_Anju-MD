const {cmd , commands} = require('../command')

cmd({
    pattern: "spotifydl",
    desc: "To download spotify songs.",
    category: "download",
    filename: __filename
},
async (message, input) => {
     try {
       const url = input.trim();
       if (!url || !isValidUrl(url)) {
         return await message.send("*_Please provide a valid Spotify URL._*");
       }
 
       const apiUrl = `https://api.maher-zubair.tech/download/spotify?url=${encodeURIComponent(
         url
       )}`;
       const response = await axios.get(apiUrl);
       const data = response.data;
 
       if (!data || data.status !== 200) {
         return await message.reply("*Failed to download the Spotify song.*");
       }
 
       const {
         song,
         artist,
         album_name,
         release_date,
         cover_url,
         url: songUrl,
       } = data.result;
 
       let output = `*Song:* ${song}\n`;
       output += `*Artist:* ${artist.join(", ")}\n`;
       output += `*Album:* ${album_name}\n`;
       output += `*Release Date:* ${release_date}\n\n`;
       output += `*Cover Image:* ${cover_url}\n\n`;
 
       const buffer = await axios.get(songUrl, { responseType: "arraybuffer" });
       const fileName = `${song.replace(/\s/g, "_")}.mp3`;
 
       await message.bot.sendMessage(
         message.chat,
         {
           audio: buffer.data,
           fileName: fileName,
           mimetype: "audio/mpeg",
           caption: output,
         },
         { quoted: message }
       );
     } catch (error) {
       await message.error(
         error + "\n\nCommand: spotify2",
         error,
         "*Failed to download the Spotify song.*"
       );
     }
   }
 );
