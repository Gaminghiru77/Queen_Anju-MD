const { decodeJid, createInteractiveMessage, parsedJid } = require('../functions')
const Base = require('./Base')
const { writeExifWebp } = require('../sticker')
const config = require('../../config')
const ReplyMessage = require('./ReplyMessage')
const fileType = require('file-type')
const { generateWAMessageFromContent, generateWAMessage, getContentType, generateForwardMessageContent } = require('baileys')
const Message = require('./Message')

class AllMessage extends Base {
 constructor(client, data) {
  super(client)
  if (data) this._patch(data)
 }

 _patch(data) {
  this.user = decodeJid(this.client.user.id)
  this.key = data.key
  this.isGroup = data.isGroup
  this.prefix = data.prefix
  this.id = data.key.id
  this.jid = data.key.remoteJid
  this.message = { key: data.key, message: data.message }
  this.pushName = data.pushName
  this.participant = parsedJid(data.sender)[0]
  try {
   this.sudo = config.SUDO.split(',').includes(this.participant.split('@')[0])
  } catch {
   this.sudo = false
  }
  this.fromMe = data.key.fromMe
  this.isBaileys = this.id.startsWith('BAE5')
  this.timestamp = data.messageTimestamp.low || data.messageTimestamp

  if (data.type) {
   const type = data.type.replace('Message', '').toLowerCase()
   this[type] = data.message[data.type]
   const contextInfo = this[type].contextInfo
   this.mention = contextInfo?.mentionedJid || false

   if (data.quoted) {
    if (data.message.buttonsResponseMessage) return
    this.reply_message = this.quoted = this.msg?.contextInfo?.quotedMessage ? new ReplyMessage(this.client, { chat: this.chat, msg: this.msg, ...this.msg.contextInfo }) : false

    if (this.reply_message) {
     const quotedMessage = data.quoted.message.extendedTextMessage
     this.reply_message.type = data.quoted.type || 'extendedTextMessage'
     this.reply_message.mtype = data.quoted.mtype
     this.reply_message.mimetype = quotedMessage?.text?.mimetype || 'text/plain'
     this.reply_message.key = data.quoted.key
     this.reply_message.message = data.quoted.message
     this.reply_message.mention = quotedMessage?.contextInfo?.mentionedJid || false
    }
   } else {
    this.reply_message = false
   }
  } else {
   this.type = 'baileysEmit'
  }

  return super._patch(data)
 }

 async sendMessage(jid, text, options = {}) {
  return this.client.sendMessage(jid, text, options, this)
 }
 async sendReply(text, opt = {}) {
  if (!this.jid) {
   throw new Error('No recipient JID available. Make sure this.jid is set.')
  }

  const options = {
   quoted: this,
   ...opt,
  }

  return this.client.sendMessage(this.jid, { text }, options)
 }

 async log() {
  console.log(this.data)
 }

 async sendFile(content, options = {}) {
  const { data } = await this.client.getFile(content)
  const type = (await fileType.fromBuffer(data)) || {}
  return this.client.sendMessage(this.jid, { [type.mime.split('/')[0]]: data }, options)
 }

 async edit(text, opt = {}) {
  await this.client.sendMessage(this.jid, { text, edit: this.key, ...opt })
 }

 async reply(text, options) {
  const message = await this.client.sendMessage(this.jid, { text }, { quoted: this.data, ...options })
  return new Message(this.client, message)
 }

 async send(text, opt = {}, jid = null) {
  let recipient

  if (jid) {
   recipient = jid.endsWith('@s.whatsapp.net') ? jid : jid + '@s.whatsapp.net'
  } else if (this.jid) {
   recipient = this.jid
  } else {
   throw new Error('No recipient specified. Please provide a JID or set this.jid.')
  }

  return this.client.sendMessage(recipient, { text, ...opt })
 }

 async delete() {
  return await this.client.sendMessage(this.jid, { delete: { ...this.data.key, participant: this.sender } })
 }

 async edit(conversation) {
  return await this.client.relayMessage(this.jid, { protocolMessage: { key: this.data.key, type: 14, editedMessage: { conversation } } }, {})
 }
 async sendMessage(jid, content, opt = { packname: 'Xasena', author: 'X-electra' }, type = 'text') {
  switch (type.toLowerCase()) {
   case 'text':
    return this.client.sendMessage(jid, { text: content, ...opt })
   case 'image' || 'photo':
    if (Buffer.isBuffer(content)) {
     return this.client.sendMessage(jid, { image: content, ...opt })
    } else if (isUrl(content)) {
     return this.client.sendMessage(jid, {
      image: { url: content },
      ...opt,
     })
    }
    break
   case 'video':
    if (Buffer.isBuffer(content)) {
     return this.client.sendMessage(jid, { video: content, ...opt })
    } else if (isUrl(content)) {
     return this.client.sendMessage(jid, {
      video: { url: content },
      ...opt,
     })
    }
    break
   case 'audio':
    if (Buffer.isBuffer(content)) {
     return this.client.sendMessage(jid, { audio: content, ...opt })
    } else if (isUrl(content)) {
     return this.client.sendMessage(jid, {
      audio: { url: content },
      ...opt,
     })
    }
    break
   case 'template':
    const optional = await generateWAMessage(jid, content, opt)
    const message = {
     viewOnceMessage: {
      message: {
       ...optional.message,
      },
     },
    }
    await this.client.relayMessage(jid, message, {
     messageId: optional.key.id,
    })
    break
   case 'interactive':
    const genMessage = createInteractiveMessage(content)
    await this.client.relayMessage(jid, genMessage.message, {
     messageId: genMessage.key.id,
    })
    break
   case 'sticker':
    const { data, mime } = await this.client.getFile(content)
    if (mime == 'image/webp') {
     const buff = await writeExifWebp(data, opt)
     await this.client.sendMessage(jid, { sticker: { url: buff }, ...opt }, opt)
    } else {
     const mimePrefix = mime.split('/')[0]
     if (mimePrefix === 'video' || mimePrefix === 'image') {
      await this.client.sendImageAsSticker(this.jid, content, opt)
     }
    }
    break
  }
 }

 async forward(jid, content, options = {}) {
  if (options.readViewOnce) {
   content = content?.ephemeralMessage?.message || content
   const viewOnceKey = Object.keys(content)[0]
   delete content?.ignore
   delete content?.viewOnceMessage?.message?.[viewOnceKey]?.viewOnce
   content = { ...content?.viewOnceMessage?.message }
  }

  if (options.mentions) {
   content[getContentType(content)].contextInfo.mentionedJid = options.mentions
  }

  const forwardContent = generateForwardMessageContent(content, false)
  const contentType = getContentType(forwardContent)

  const forwardOptions = {
   ptt: options.ptt,
   waveform: options.audiowave,
   seconds: options.seconds,
   fileLength: options.fileLength,
   caption: options.caption,
   contextInfo: options.contextInfo,
  }

  if (options.mentions) {
   forwardOptions.contextInfo.mentionedJid = options.mentions
  }

  if (contentType !== 'conversation') {
   forwardOptions.contextInfo = content?.message[contentType]?.contextInfo || {}
  }

  forwardContent[contentType].contextInfo = {
   ...forwardOptions.contextInfo,
   ...forwardContent[contentType]?.contextInfo,
  }

  const waMessage = generateWAMessageFromContent(jid, forwardContent, {
   ...forwardContent[contentType],
   ...forwardOptions,
  })
  return await client.relayMessage(jid, waMessage.message, {
   messageId: waMessage.key.id,
  })
 }
}

module.exports = AllMessage
