const { cmd } = require('../command')
const config = require('./config')
const isReact = m.message.reactionMessage ? true : false

if(senderNumber.includes(config.BOT_NUMBER)){
if(isReact) return
m.react(config.OWNER_REACT)
}
