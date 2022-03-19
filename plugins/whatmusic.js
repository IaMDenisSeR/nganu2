let fs = require('fs')
let acrcloud = require('acrcloud')
let acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: 'f692756eebf6326010ab8694246d80e7',
    access_secret: 'm2KQYmHdBCthmD7sOTtBExB9089TL7hiAazcUEmb'
})

let handler = async (m, {usedPrefix}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/audio|video/.test(mime)) {
        let media = await q.download()
        let ext = mime.split('/')[1]
        fs.writeFileSync(`./${m.sender}.${ext}`, media)
        let res = await acr.identify(fs.readFileSync(`./${m.sender}.${ext}`))
        let { code, msg } = res.status
        if (code !== 0) throw msg
        let { title, artists, album, genres, release_date } = res.metadata.music[0]
        let txt = 'Song Got It!!!\n'
              txt += 'Title:' + `${title}` + '\n';
              txt += 'Artist: ' + `${artists !== undefined ? artists.map(v => v.name).join(', ') : ''}` + '\n';
              txt += 'Album:' + `${album.name || ''}` + '\n';
              txt += 'Genre:' + `${genres !== undefined ? genres.map(v => v.name).join(', ') : ''}` + '\n';
              txt += 'Release:' + `${release_date}` + '\n';
              
              
        fs.unlinkSync(`./${m.sender}.${ext}`)
        await conn.sendButton(m.chat, '```' + txt + '```', '𝑅𝑒𝑎𝑑𝑦 𝑇𝑜 𝐷𝑜𝑤𝑛𝑙𝑜𝑎𝑑!', '𝑃𝑙𝑎𝑦', `${usedPrefix}play ${title}` )
    } else throw '*Reply audio/video To Find it!*'
}
handler.help = ['find <reply>']
handler.tags = ['tools']
handler.command = /^find/i

module.exports = handler