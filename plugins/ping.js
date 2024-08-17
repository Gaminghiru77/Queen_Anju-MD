const { bot } = require('../lib')

cmd({
    pattern: "ping",
    desc: "To Check the ping",
    category: "main",
    filename: __filename
},
async (message, match) => {
const start = new Date().getTime()
await message.send('`````♤Pinging♤`````')
const end = new Date().gettime()
return await message.send('*P●NG*```' + (end - start) + '```*ms*')
})
