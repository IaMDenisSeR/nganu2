let yts = require('yt-search')
let handler = async (m, { text, usedPrefix }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!teks) throw '```Enter any music!!```'
  
  
  let datai = [];
				try{
				yts(teks).then(async res => {
				let hdata = res.all
				for(let i=11; i<hdata.length; i++){
				   datai.push({
					"rows": [
					{
					"title": `${hdata[i].title}`,
					description: ``,
					"rowId": `${usedPrefix}yta ${hdata[i].url}`
				  }
				], title: `Duration ${hdata[i].timestamp} ( ${hdata[i].ago} )`})
				   }
				let jo = conn.prepareMessageFromContent(m.chat, {
				"listMessage":{
				"title": `Hi @${m.sender.split("@")[0]}`,
				"description": `*Matched songs For ${teks}*\n\n`,
				"buttonText": "Download",
				"listType": "SINGLE_SELECT",
				"sections": datai}}, {contextInfo: { mentionedJid: [m.sender] }}, {}) 
				await conn.relayWAMessage(jo, {waitForAck: true})
				})
				  } catch(e) {
				 m.reply('```' + e + '```')
				}
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <music name>')
handler.tags = ['download']
handler.command = /^(yts|song)?$/i

module.exports = handler
