const { fetchFiles, createSession } = require('./system')
const { Facebook, Instagram } = require('./scraper')
const { server } = require('./tools')
module.exports = {
 Facebook,
 Instagram,
 server,
 fetchFiles,
 createSession,
}
