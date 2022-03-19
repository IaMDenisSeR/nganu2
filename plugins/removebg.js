
	const { MessageType } = require("@adiwajshing/baileys")
	const fs = require('fs')
	const remobg = require('remove.bg')
	let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
	let mime = m.quoted.mimetype || ''
	if (!/image|webp/.test(mime)) return conn.reply(`Give me a photo or sticker caption with ${prefix + command}`)
			    
			    let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU','S258diZhcuFJooAtHTaPEn4T','5LjfCVAp4vVNYiTjq9mXJWHF','aT7ibfUsGSwFyjaPZ9eoJc61','BY63t7Vx2tS68YZFY6AJ4HHF','5Gdq1sSWSeyZzPMHqz7ENfi8','86h6d6u4AXrst4BVMD9dzdGZ','xp8pSDavAgfE5XScqXo9UKHF','dWbCoCb3TacCP93imNEcPxcL']
			    let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
			    hmm = await './src/remobg-'+getRandom('')
			    localFile = await conn.downloadAndSaveMediaMessage(q, hmm)
			    outputFile = await './src/hremo-'+getRandom('.png')
			    m.reply('```Wait...```')
			    remobg.removeBackgroundFromImageFile({
			      path: localFile,
			      apiKey: apinobg,
			      size: "regular",
			      type: "auto",
			      scale: "100%",
			      outputFile 
			    }).then(async result => {
			    conn.sendMessage(m.chat, fs.readFileSync(outputFile), MessageType.image, { caption: '*By Denis*', quoted: m})
			    await fs.unlinkSync(localFile)
			    await fs.unlinkSync(outputFile)
	        })
}

handler.help = ['removebg <reply image>']
handler.tags = ['image']
handler.command = /^removebg$/i
module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}