const config = require('../../config')
const { parsedJid } = require('../functions')
const Base = require('./Base')
const fileType = require('file-type')
const { tmpdir } = require('os')
const fs = require('fs')
const { Buffer } = require('buffer')
const { writeExifWebp } = require('../sticker')
const { createInteractiveMessage } = require('../functions')
const Message = require('./Message')
const { jidNormalizedUser, getContentType, generateWAMessage, generateForwardMessageContent, generateWAMessageFromContent } = require('baileys')
class ReplyMessage extends Base {
 constructor(client, data) {
  super(client)
  if (data) this._patch(data)
 }
 _patch(data) {
  this.key = data.key
  this.id = data.stanzaId
  this.sender = jidNormalizedUser(data.participant)
  this.fromMe = this.sender === jidNormalizedUser(this.client.user.id)
  this.isBaileys = this.id.startsWith('BAE5') || this.id.length === 16
  this.jid = data.participant
  this.isBot = this.id.startsWith('BAE5') && this.id.length === 16
  this.chat = this.jid = data.remoteJid || data.chat
  this.type = getContentType(data.quotedMessage)
  this.msg = data.quotedMessage
  this.text = this.msg[this.mtype]?.text || this.msg[this.mtype]?.caption || this.msg.conversation || this.msg[this.mtype]?.contentText || this.msg[this.mtype]?.selectedDisplayText || this.msg[this.mtype]?.title || false
  try {
   this.sudo = config.SUDO.split(',').includes(this.participant.split('@')[0])
  } catch {
   this.sudo = false
  }
  this.fromMe = parsedJid(this.client.user.jid)[0] === parsedJid(this.jid)[0]
  const { quotedMessage } = data
  if (quotedMessage) {
   let type = Object.keys(quotedMessage)[0]
   if (type === 'extendedTextMessage') {
    this.text = quotedMessage[type].text
    this.mimetype = 'text/plain'
   } else if (type === 'conversation') {
    this.text = quotedMessage[type]
    this.mimetype = 'text/plain'
   } else if (type === 'stickerMessage') {
    this.mimetype = 'image/webp'
    this.sticker = quotedMessage[type]
   } else {
    let mimetype = quotedMessage[type]?.mimetype ? quotedMessage[type].mimetype : type
    if (mimetype?.includes('/')) {
     this.mimetype = mimetype
     let mime = mimetype.split('/')[0]
     this[mime] = quotedMessage[type]
    } else {
     this.mimetype = mimetype
     this.message = quotedMessage[type]
    }
   }
  }
  this.data = {
   key: {
    remoteJid: data.remoteJid,
    fromMe: data.fromMe,
    id: data.stanzaId,
    participant: this.jid,
   },
   message: data.quotedMessage,
  }
  return super._patch(data)
 }

 async downloadMediaMessage() {
  const buff = await this.m.quoted.download()
  const type = await fileType.fromBuffer(buff)
  await fs.promises.writeFile(tmpdir() + type.ext, buff)
  return tmpdir() + type.ext
 }

 async reply(text, options) {
  const message = await this.client.sendMessage(this.jid, { text }, { quoted: this.data, ...options })
  return new Message(this.client, message)
 }

 async delete() {
  return await this.client.sendMessage(this.jid, { delete: this.key })
 }

 async edit(text, opt) {
  await this.client.sendMessage(this.jid, { text, edit: this.key, ...opt })
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
 async send(content, options = {}, type = 'text', jid = null) {
  let recipient = jid || this.jid
  if (!recipient) {
   throw new Error('No recipient specified. Please provide a JID or ensure this.jid is set.')
  }

  if (typeof recipient === 'string' && !recipient.endsWith('@s.whatsapp.net')) {
   recipient += '@s.whatsapp.net'
  }

  const defaultOptions = { packname: 'Xasena', author: 'X-electra' }
  const opt = { ...defaultOptions, ...options }

  const isUrl = url => {
   try {
    new URL(url)
    return true
   } catch {
    return false
   }
  }

  switch (type.toLowerCase()) {
   case 'text':
    return this.client.sendMessage(recipient, { text: content, ...opt })

   case 'file':
    const { data } = await this.client.getFile(content)
    const fileTypeInfo = (await fileType.fromBuffer(data)) || {}
    return this.client.sendMessage(recipient, { [fileTypeInfo.mime.split('/')[0]]: data }, opt)

   case 'edit':
    return this.client.sendMessage(recipient, { text: content, edit: this.key, ...opt })

   case 'reply':
    const replyMessage = await this.client.sendMessage(recipient, { text: content }, { quoted: this.data, ...opt })
    return new Message(this.client, replyMessage)

   case 'image':
   case 'photo':
   case 'video':
   case 'audio':
    if (Buffer.isBuffer(content)) {
     return this.client.sendMessage(recipient, { [type]: content, ...opt })
    } else if (isUrl(content)) {
     return this.client.sendMessage(recipient, { [type]: { url: content }, ...opt })
    }
    break

   case 'template':
    const optional = await generateWAMessage(recipient, content, opt)
    const templateMessage = {
     viewOnceMessage: {
      message: {
       ...optional.message,
      },
     },
    }
    return this.client.relayMessage(recipient, templateMessage, { messageId: optional.key.id })

   case 'interactive':
    const genMessage = createInteractiveMessage(content)
    return this.client.relayMessage(recipient, genMessage.message, { messageId: genMessage.key.id })

   case 'sticker':
    const { data: stickerData, mime } = await this.client.getFile(content)
    if (mime == 'image/webp') {
     const buff = await writeExifWebp(stickerData, opt)
     return this.client.sendMessage(recipient, { sticker: { url: buff }, ...opt }, opt)
    } else {
     const mimePrefix = mime.split('/')[0]
     if (mimePrefix === 'video' || mimePrefix === 'image') {
      return this.client.sendImageAsSticker(recipient, content, opt)
     }
    }
    break

   default:
    throw new Error(`Unsupported message type: ${type}`)
  }
 }
}

module.exports = ReplyMessage
