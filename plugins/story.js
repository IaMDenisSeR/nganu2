require('dotenv').config()
const { MessageType } = require("@adiwajshing/baileys")
const { igApi } = require("insta-fetcher");
let ig = new igApi(process.env.session_id)
let storyRegExp = new RegExp(/https:\/\/(www\.)?instagram\.com\/stories\/.+/g)
let fetch = require('node-fetch')

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  try {
  let u = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!u) throw `Give The Instagram Story Link!`
  if (!u.match(storyRegExp)) throw `Can Download Instagram Story.\nIf U Download Instagram p/reel/tv Use ${usedPrefix}insta`
            m.reply('```Downloading...```')
            let s = u.indexOf('?') >= 0 ? u.split('?')[0] : (u.split('').pop() == '/' != true ? `${u}` : u);
            let [username, storyId] = s.split('/stories/')[1].split('/')
            const data = await ig.fetchStories(username);
            let media = data.stories.filter(x => x.id.match(storyId))
            await delay(1000)
            await conn.sendMessage(m.chat, '```' + `Uploading Story..` + '```', MessageType.text, { contextInfo: { externalAdReply: { title: `@${username}`, body: '', previewType:"2", thumbnail: global.thumb, sourceUrl: u}}})
            await conn.sendFile(m.chat, media[0].url, 'Den' + (media[0].type == 'image'? '.jpeg' : '.mp4'), '', m)
        } catch (error) {
            console.log(error);
            await m.reply('```' + error + '```')
        }
    }
handler.help = ['igstory'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^story/i

module.exports = handler

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

async function getBuffer(url) {
ff = await fetch(url)
fff = await ff.buffer()
return fff
}