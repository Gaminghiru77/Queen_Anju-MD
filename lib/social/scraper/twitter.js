const axios = require('axios')
const fs = require('fs')
const config = require('../../../config')
const apiUrl = config.BASE_API + '/download/twitter?url='

/**
 * Download Twiiter Media
 */
class Twitter {
 /**
  * Create a Twitter video downloader.
  * @param {string} apiUrl - The base URL of the API.
  */

 /**
  * Fetches the video from the provided Twitter URL and returns it as a buffer.
  * @param {string} videoUrl - The URL of the Twitter video.
  * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the video data.
  * @throws Will throw an error if the video cannot be fetched.
  */
 async download(videoUrl) {
  try {
   const response = await axios.get(`${apiUrl}${encodeURIComponent(videoUrl)}`)
   const jsonData = response.data
   if (jsonData.success && jsonData.status === 200) {
    const videoUrl = jsonData.url
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' })
    return Buffer.from(videoResponse.data)
   } else {
    throw new Error('Failed to fetch video URL')
   }
  } catch (error) {
   console.error('Error fetching video buffer:', error.message)
   throw error
  }
 }
}
module.exports = Twitter
// // Example usage
// ;(async () => {
//  const downloader = new Twitter()
//  const videoUrl = 'https://twitter.com/elonmusk/status/1822355008559489216?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet'

//  try {
//   const videoBuffer = await downloader.download(videoUrl)
// console.log(videoBuffer)
//   // Save the buffer to a file (optional)
// //   fs.writeFileSync('video.mp4', videoBuffer)

//   console.log('Video downloaded successfully!')
//  } catch (error) {
//   console.error('Failed to download video:', error.message)
//  }
// })()
