const axios = require('axios')
const config = require('../../../config')

class Instagram {
 constructor() {
  this.apiUrl = config.BASE_API + '/download/instagram?url='
 }

 async download(url) {
  try {
   const response = await axios.get(`${this.apiUrl}${encodeURIComponent(url)}`, {
    headers: {
     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
   })
   const data = response.data
   if (!data.success) {
    throw new Error('Failed to download')
   }
   const videoResponse = await axios.get(data.url, {
    responseType: 'arraybuffer',
   })
   return videoResponse.data
  } catch (error) {
   console.error('Failed to download:', error)
   return null
  }
 }
}

module.exports = Instagram
