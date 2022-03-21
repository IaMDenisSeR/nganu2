const { MessageType } = require('@adiwajshing/baileys')
const util = require('util')
const fetch = require('node-fetch')
	let handler = async (m, { conn }) => {
		try {
	let senderNumber = m.sender.split("@")[0] 
	let num = await fetchJson(`https://api.telnyx.com/anonymous/v2/number_lookup/${senderNumber}`, {method: 'get'})
	await conn.sendMessage(m.chat, `${num.data.country_code} - ${num.data.carrier.type} - ${num.data.carrier.name}` + utli.format(num.data), MessageType.text)
	} catch (e) {
		m.reply(e)
		}
}
handler.help = ['nowame']
handler.tags = ['info']
handler.command = /^wa$/i

module.exports = handler


exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})
