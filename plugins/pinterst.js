const uploadFile = require('../lib/uploadFile')
const axios = require('axios');
const fetch = require('node-fetch')
const regex = /https?:\/\/?(www|pin|id)?\.(it|pinterest\.co(m|\.[a-z]{1,2}))\S+\//g

let handler = async (m, { conn, args }) => {
  try {
           let url = regex.exec(args[0])
            m.reply('```Downloading..```')
            let data = await fetch(API('masgi', '/pinterest/download.php?url=' + url))
            let media = data.is_video ? data.videos.video_list[Object.getOwnPropertyNames(data.videos.video_list)[0]] : data.images.orig
            await conn.sendFile(m.chat, media.url, '', `*${data.title || data.closeup_unified_title}* - Posted at ${moment(data.created_at).format('DD/MM/YY HH:mm:ss')}`, m)
        } catch (error) {
            console.log(error);
            await m.reply('```' + error + '```')
        }
    }
handler.help = ['Pinterest (caption|reply media)']
handler.tags = ['downloader']
handler.command = /^p(in|interest)?$/i

module.exports = handler

async function fetchAPI(api, params, options = {}) {
	try {
		const res = await axios({
			url: (global.API[api] || api) + params,
			method: options.method || 'GET',
			data: options.data,
			...options
		})
		//const { data } = await axios.get(global.API[api] || api + params, { ...options });
		return res.data;
	} catch (error) {
		throw new Error(error);
	}
}
