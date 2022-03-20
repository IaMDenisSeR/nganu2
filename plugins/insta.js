require('dotenv').config()
const { MessageType } = require('@adiwajshing/baileys')
const { igApi, shortcodeFormatter, IGPostRegex } = require("insta-fetcher");
const { randomBytes } = require('crypto');
let fetch = require('node-fetch')
let ig = new igApi(process.env.session_id)

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
try {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!teks) throw 'Give A Instagram Link! Like post/reel/tv.'
  if (!teks.match(/https:\/\/www.instagram.com\/(p|reel|tv|s)/gi)) throw `Can Download Tv/Post/Reel.\nIf U Download The story Use ${usedPrefix}story`

            m.reply('```Downloading...```')
            let { url } = shortcodeFormatter(teks);
            let result = await ig.fetchPost(url);
            let arr = result.links;
            let capt = '• Name : ' + result.name + '\n';
            capt += '• Username : ' + result.username + '\n';
            capt += '• Likes : ' + result.likes + '\n';
            let eh = `Uploading Instagram - ` + result.media_count + result.postType
            await delay(1000)
            await conn.sendMessage(m.chat, '```' + capt + '```', MessageType.text, { contextInfo: { externalAdReply: { title: eh, body: '', previewType:"2", thumbnail: global.thumb, sourceUrl: teks}}})
            
                for (let i = 0; i < arr.length; i++) {
                	await conn.sendFile(m.chat, arr[i].url, 'ig' + (arr[i].type == 'image'? '.jpeg' : '.mp4'), '')
                    
                }
        } catch (error) {
            console.log(error);
            await m.reply('```' + error + '```')
        }
    }
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^i(g|nsta)?/i
//handler.premium = true

module.exports = handler

async function getBuffer(url) {
ff = await fetch(url)
fff = await ff.buffer()
return fff
}

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}