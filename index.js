
/*
* "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
* Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
* (QS ash-Shaff: 2-3).
*/
const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const menu = require("./lib/menu.js");
const donasi = require("./lib/donasi.js");
const info = require("./lib/info.js");
/////////////////
const BotName = 'Azumi[BOT]'; 
const instagram = 'https://instagram.com/1qbal_1st'; 
const whatsapp = 'wa.me/994403407068'; 
const kapanbotaktif = '24JAM'; 
const api = `RAPTOR`;   
const grupch1 = 'https://chat.whatsapp.com/IujvcBtCiaoChP0qCQsLhc'; 
//const grupch2 = 'belum ada grup' ; 
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

// OCR Library
const readTextInImage = require('./lib/ocr')

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr `);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log('Bot by ig:@aditiaalfians')
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by ig=AdrynAzumi_`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Fitur
if (text.includes('$textimage')){
  const teks = text.replace(/$textimage /, '')
    axios.get('https://mhankbarbar.herokuapp.com/api/text2image?text=${teks}&apiKey=RAPTOR')
    .then((res) => { imageToBase64(res.data.result)
      .then(
       (ress) => {
         conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
         var buf = Buffer.from(ress, 'base64')
         conn.sendMessage(id, buf, MessageType.image)
        })
    })
}




if (text.includes("$katabijak")){
const teks = text.replace(/$katabijak /, "")
axios.get(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt${teks}`).then((res) => {
    let hasil = `Judul: ${res.data.title}\n\katabijak Tersedia: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}


if (text.includes('$nulis')){
  var teks = text.replace(/$nulis /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes("$say")){
  const teks = text.replace(/$say /, "")
conn.sendMessage(id, teks, MessageType.text)
}


if (text.includes("$ytmp3")){
const teks = text.replace(/$ytmp3 /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/yta?url=${teks}&apiKey=${api}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `*➸Title* : ${res.data.title}\n\n*➸File Size* : ${res.data.filesize}\n*➸Download* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("$ytmp4")){
const teks = text.replace(/$ytmp4 /, "")
axios.get(`https://alfians-api.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `*Judul* : ${res.data.title}\n\n*File size*: ${res.data.filesize}\n\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("$twt")){
const teks = text.replace(/$twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=${api}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `✅Berhasil! silahkan klik link di bawah untuk mendownload hasilnya!\nKlik link dibawah🗡️\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes("$tiktok")) {
const tictoc = text.replace(/$tiktok /, "")
axios.get(`https://st4rz.herokuapp.com/api/tiktok?url=${tictoc}`).then((res) => {
	 conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
     let titoe = `✅Berhasil!!! Silahkan klik link dibawah ini untuk mendownload hasilnya! \nKlik link dibawah🗡️\n\nJudul: ${res.data.deskripsi} \n\nDurasi: ${res.data.durasi}\n\nNama: ${res.data.nama}\n\nUrl: ${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
})
}

if (text.includes("$wikiIn")){
const teks = text.replace(/$wikiIn /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/wiki?q=${teks}&lang=id&apiKey=${api}`).then((res) => {
    let hasil = `➸ *QUERY* : ${teks}\n \n➸ *RESULT* : ${res.data.result}`
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes("$wikiEn")){
const teks = text.replace(/$wikiEn /, "")
axios.get(`https://arugaz.herokuapp.com/api/wikien?q=${teks}`).then((res) => {
let hasil = `➸ *QUERY* : ${teks}\n \n➸ *RESULT* : ${res.data.result}`
conn.sendMessage(id, hasil ,MessageType.text); 
})
}
if (text.includes("$twitter")){
const teks = text.replace(/$twitter /, "")                                                            
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=${api}`).then((res) => {
let hasil = `➸ *Title* : ${res.data.title}\n➸ *FileSize* : ${res.data.filesize}\n➸ *Quote* : ${res.data.quote}\n➸ *LinkDownload* : ${res.data.result}`
conn.sendMessage(id, hasil ,MessageType.text);                                                       })
})
}




if (text.includes("$igdl")){
const teks = text.replace(/$igdl /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/ig?url=${teks}&apiKey=${api}`).then((res) => {
    let hasil = `➸ *DOWNLOAD* : ${res.data.result}`
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
if (text.includes("$sholat")){
  const teks = text.replace(/$sholat /, "")
  axios.get(`https://mhankbarbar.herokuapp.com/api/jadwalshalat?daerah=${teks}&apiKey=${api}`).then ((res) =>{
  let hasil = `Jadwal sholat di ${teks} hari ini \n*Ashar* : ${res.data.Ashar}\n*Dhuha* : ${res.data.Dhuha}\n*Dzuhur* : ${res.data.Dzuhur}\n*Imsyak* : ${res.data.Imsyak}\n*Isya* : ${res.data.Isya}\n*Maghrib* : ${res.data.Maghrib}\n*Subuh* : ${res.data.Subuh}`;
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text == '$menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}

if (text.includes("$quran")){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

else if (text == '$nasi'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donasi.donasi(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
else if (text == '$info'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
else if (text == '$pict'){
conn.sendMessage(id, 'ulangi dengan  $pict cewek/cowok\n\nMisal: !pict cowok' ,MessageType.text);
}

  // Optical Character Recognition
  if (messageType == 'imageMessage')
   {
       let caption = imageMessage.caption.toLocaleLowerCase()
       if (caption == '$ocr')
       {
           const img = await conn.downloadAndSaveMediaMessage(m)
           readTextInImage(img)
               .then(data => {
                   console.log(data)
                   conn.sendMessage(id, `*Read Data Text in Image* \n\nHasil: \n\n${data}`, MessageType.text);
               })
               .catch(err => {
                   console.log(err)
               })
       }
   }
if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '$sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }





   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '$pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   };
      if (text.includes("$covid19"))
   {
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {

    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,`*DATA WABAH COVID-19 INDO*\n\n*Positif* = ${positif} \n*Sembuh* = ${sembuh} \n*Meninggal* = ${meninggal}\n*Dirawat* = ${dirawat}`, MessageType.text);
}
   if (text.includes("$quotes1"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
_${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
   }
   else if (text.includes("$nama1")) 
  {
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split("$nama ")[1];
    var req = nama.replace(/ /g,"+");
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
      },function(error, response, body){
          let $ = cheerio.load(body);
          var y = $.html().split('arti:')[1];
          var t = y.split('method="get">')[1];
          var f = y.replace(t ," ");
          var x = f.replace(/<br\s*[\/]?>/gi, "\n");
          var h  = x.replace(/<[^>]*>?/gm, '');
      console.log(""+ h);
      conn.sendMessage(id,
            `
      Arti dari namamu adalah
  ***********************************
         Nama _*${nama}*_ ${h}
  ***********************************
`,
 MessageType.text);
  });
  }
  else if (text.includes("$pasangan ")) {
    const request = require('request');
    var gh = text.split("$pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `
************************************
 *Kecocokan berdasarkan nama*
 ${d}
************************************
    `, MessageType.text);
  });
  }
   if (text.includes("$pict cewek"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "remaja cantik", "cewek korea", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
   if (text.includes("$pict cowok"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy", "cowok indo ganteng", "cowok korea"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok =  z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok) 
        .then(
            (response) => {
  conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
  var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
   }
if (text.includes("$lirik")){
	const teks = text.split("$lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
	 	let hasil = `liirik lagu${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("$alay")){
	const alay = text.split("$alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$igstalk")){
const sons = text.replace(/$igstalk /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/stalk?username=${sons}&apiKey=${api}`).then ((res) =>{
let hasil = `*➸ Username* : ${res.data.Username}\n*➸ Nama* : ${res.data.Name}\n*➸ Follower* : ${res.data.Jumlah_Followers}\n*➸ Followed* : ${res.data.Jumlah_Following}\n*➸ Jumlah_Postingan* : ${res.data.Jumlah_Post}\n*➸ Biodata* : ${res.data.Biodata}`
conn.sendMessage(id ,hasil , MessageType.text)
})
}
if (text.includes('$mapgempa')){
  var teks = text.replace(/$mapgempa /, '')
    axios.get('https://arugaz.herokuapp.com/api/infogempa')
    .then((res) => {
      imageToBase64(res.data.map)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes("$nhentai")){
const teks = text.replace(/$nhentai /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/nhentai?type=download&nuklir=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*➸ Title* : ${res.data.title}\n*➸ Category* : ${res.data.categories}\n*➸ Artist* : ${res.data.artists}\n*➸ Id* : ${res.data.id}\n*➸ Bahasa* : ${res.data.languages}\n*➸ Tag* : ${res.data.tags}\n\n*➸ Link* : ${res.data.result}`
conn.sendMessage(id, hasil ,MessageType.text);                                                       })                                                                                                   }







if (text.includes("$infogempa")){
const sons = text.split("$infogempa")[0]
axios.get(`https://arugaz.herokuapp.com/api/infogempa`).then((res) => {
let hasil = `*➸Kedalaman* : ${res.data.kedalaman}\n*➸Koordinat* : ${res.data.koordinat}\n*➸Lokasi* : ${res.data.lokasi}\n*➸Potensi* : ${res.data.potensi}\n*➸Status* : ${res.data.status}\n*➸Waktu* : ${res.data.waktu}\n*➸Magnitude* : ${res.data.magnitude}`;
 conn.sendMessage(id, hasil ,MessageType.text);
})
                                                                                                                    }
if (text.includes("$bapakfont")){
const teks = text.replace(/$bapakfont /, "")
axios.get(`https://arugaz.herokuapp.com/api/bapakfont?kata=${teks}`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("$time")){
const teks = text.replace(/$time /, "")
Method.get(`https://api.i-tech.id/tools/jam?key=1IOTvw-Du0ydN-oSBHio-7X4NMK-sYzEvN&kota=${teks}`).then((res) =>{
let hasil = `*Timezone* : ${res.data.timezone}\n*Date* : ${res.data.date}\n*Time* : ${res.data.time}\n*Latitude* : ${res.data.latitude}\n*longtitude* : ${res.data.longtitude}\n*Address* : ${res.data.address}`
conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("$cuaca ")){
const teks = text.replace(/$cuaca /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/cuaca?q=${teks}&apiKey=${api}`).then ((res) =>{
conn.sendMessage(id, `🍻 Permintaan anda sedang di proses, ditunggu aja gan.` ,MessageType.text)
let hasil =`➸Tempat : ${res.data.result.tempat}\n\n➸Angin : ${res.data.result.angin}\n➸Cuaca : ${res.data.result.cuaca}\n➸Deskripsi : ${res.data.result.desk}\n➸Kelembapan : ${res.data.result.kelembapan}\n➸Suhu : ${res.data.result.suhu}\n➸Udara : ${res.data.result.udara}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$seberapagay")){
const teks = text.replace(/$seberapagay /, "")
axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) =>{
let hasil = `Pertanyaan :seberapa gay ${teks}\n\n*➸Jawaban* : ${res.data.persen}%`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$seberapabucin")){     
const teks = text.replace(/$seberapabucin /, "")
axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) =>{
let hasil = `*Pertanyaan* : ${teks}\n*➸ Hasil* : ${res.data.persen}%`
conn.sendMessage(id, hasil, MessageType.text); 
})
}

if (text.includes("$simi")){
const teks = text.replace(/$simi /, "")
axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$jadwaltvnow")){
const teks = text.replace(/$jadwaltvnow /, "")
axios.get(`https://api.haipbis.xyz/jadwaltvnow`).then((res) =>{
let hasil = `*JAM* : ${res.data.jam}\n*JadwalTV* :\n*______________________________________________________* \n${res.data.jadwalTV}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$covidcountry")){
const teks = text.replace(/$covidcountry /, "")
axios.get(`https://arugaz.herokuapp.com/api/corona?country=${teks}`).then((res) =>{
let hasil = `*➸Country* : ${res.data.result.country}\n\n*➸Active* : ${res.data.result.active}\n*➸Critical* : ${res.data.result.critical}\n*➸Recovered* : ${res.data.result.recovered}\n*➸Today Cases* : ${res.data.result.todayCases}\n*➸Today Death* : ${res.data.result.todayDeath}\n*➸Total Cases* : ${res.data.result.totalCases}\n*➸Total Death* : ${res.data.result.totalDeath}\n*➸Total Test* : ${res.data.result.totalTest}\n*➸Test PerOne Milion* : ${res.data.result.testPerOneMillion}\n*➸Deaths Per One Milion* : ${res.data.result.deathsPerOneMillion}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$spamcall")){
const teks = text.replace(/$spamcall /, "")
conn.sendMessage(id,`[ ! ] Perintah ini hanya khusus owner Azumi | BOT`, MessageType.text);
}
if (text.includes("$JOIN")){
const teks = text.replace(/$JOIN /, "")
conn.sendMessage(id, `[ ! ] Perintah ini hanya khusus owner Azumi | BOT`, MessageType.text);
}
if (text.includes("$JOlN")){
const teks = text.replace(/$JOlN /, "")
conn.sendMessage(id, `_Berhasil Bergabung Ke grup_`, MessageType.text);
}
if (text.includes("$spamgmail")){
const teks = text.replace(/$spamgmail /, "")
conn.sendMessage(id, `[ ! ] Perintah ini hanya khusus owner Azumi | BOT`,MessageType.text);
}
if (text.includes("$puisi1")){
const teks = text.replace(/$puisi1 /, "")
axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$spamcaII")){
const teks = text.replace(/$spamcaII /, "")
axios.get(`https://arugaz.herokuapp.com/api/spamcall?no=${teks}`).then((res) =>{
let hasil = `*➸Status* : ${res.data.logs}`
conn.sendMessage(id,hasil, MessageType.text);
})
}
if (text.includes("$shorturl")){
const teks = text.replace(/$shorturl /, "")
axios.get(`https://api.haipbis.xyz/bitly?url=${teks}`).then((res) => {
let hasil = `*Hasil* : ${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$zodiak")){
const teks = text.replace(/$zodiak /, "")
axios.get(`https://arugaz.herokuapp.com/api/getzodiak?nama=aruga&tgl-bln-thn=${teks}`).then((res) => {
let hasil = `*Lahir* : ${res.data.lahir}\n*Ulang Tahun* : ${res.data.ultah}\n*Usia* : ${res.data.usia}\n*Zodiak* : ${res.data.zodiak}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$text2image")){
const teks = text.replace(/$text2image /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/text2image?text=${teks}&apiKey=${api}`).then((res) => {
let hasul =`text image Telah tersedia Di bawah ini \n${res.data.result}`
conn.sendMessage(id, hasul, MessageType.text);
})
}
if (text.includes("$nama2")){
const teks = text.replace(/$nama2 /, "")
axios.get(`https://arugaz.herokuapp.com/api/artinama?nama=${teks}`).then((res) =>{
let hasil = `➸ *ARTI NAMA ${teks}*\n\n${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}




if (text.includes("$spamsms")){
const teks = text.replace(/$spamsms /, "")
axios.get(`https://arugaz.herokuapp.com/api/spamsms?no=${teks}&jum=20`).then((res) =>{
let hasil = `*➸Status* : ${res.data.logs}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes('$ssweb')){
  var teks = text.replace(/$ssweb /, '')
    axios.get('https://mnazria.herokuapp.com/api/screenshotweb?url='+teks)
    .then((res) => {
      imageToBase64(res.data.gambar)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes('$k')){
  var teks = text.replace(/$k /, '')
    axios.get('https://mnazria.herokuapp.com/api/picanime?list='+teks)
.then((res) => {                                                                                                                                   imageToBase64(res.data.gambar)                                                                                                                 .then(                                                                                                                                         (ress) => {                                                                                                                                    conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)                                                                  
})    
})
}
if (text.includes('$map')){
  var teks = text.replace(/$map /, '')
    axios.get('https://mnazria.herokuapp.com/api/maps?search='+teks)
    .then((res) => {
      imageToBase64(res.data.gambar)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes('$profileig')){
  var teks = text.replace(/$profileig /, '')
    axios.get('https://arugaz.herokuapp.com/api/stalk?username='+teks)
    .then((res) => {
      imageToBase64(res.data.Profile_pic)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes('$nekonime')){
  var teks = text.replace(/$nekonime /, '')
    axios.get('https://arugaz.herokuapp.com/api/nekonime')
.then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text == '$help'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
if (text.includes("$pokemon"))
   {
    var items = ["anime pokemon"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }
if (text.includes('$loli')){
  var teks = text.replace(/$loli /, '')
    axios.get('https://arugaz.herokuapp.com/api/randomloli')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes('$nulis1')){
  var teks = text.replace(/$nulis1 /, '')
    axios.get('https://arugaz.herokuapp.com/api/nulis?text='+teks)
    .then((res) => {
      imageToBase64(res.data.result.data)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes('$randomhentai')){
  var teks = text.replace(/$randomhentai /, '')
    axios.get('https://mhankbarbar.herokuapp.com/api/random/hentai?apiKey=RAPTOR')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })                                                                                                                                       }
if (text.includes('$randomanime')){
  var teks = text.replace(/$randomanime /, '')
    axios.get('https://arugaz.herokuapp.com/api/waifu')
    .then((res) => {
      imageToBase64(res.data.image)
        .then(
          (ress) => {
            conn.sendMessage(id, 'Proses bor tunggu aja sabar ^_^', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes("$buatgrup"))
   {
var nama = text.split("$buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("created group with id: " + group.gid)
conn.sendMessage(group.gid, "hello everyone", MessageType.extendedText) // say hello to everyone on the group

}	
if (text.includes("$faktaunik")){
const fetch = require("node-fetch");
fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt').then(res => 
res.text()).then(body => {
  let brpr = body.split("\n");
  let hgq = brpr[Math.floor(Math.random() * brpr.length)];
  conn.sendMessage(id, hgq , MessageType.text);
  });
}


if (text.includes(`$linkwa`)){
const teks = text.replace(/$linkwa /, "")
let hasil = `https://wa.me/${teks}`
conn.sendMessage(id, hasil, MessageType.text);
}

else if (text == `$spamcall`){
conn.sendMessage(id, `Perintah ini hanya khusus owner Bot Azumi` ,MessageType.text);
}
else if (text == '$owner'){
conn.sendMessage(id, 'Owner https://wa.me/994403407068' ,MessageType.text);
}
else if (text == 'Sayang'){
conn.sendMessage(id, 'Iyah Sayang ><' ,MessageType.text);
}
else if (text == 'Ayang'){
conn.sendMessage(id, 'Iyah Sayangku ><' ,MessageType.text);
}
else if (text == 'I love u'){
conn.sendMessage(id, 'love you too sayang' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, 'Sama sama, cuk jangan lupa donate yah :D' ,MessageType.text);
}
else if (text == `woi`){
conn.sendMessage(id, `Lah ngapa anjing??` ,MessageType.text);
}
else if (text == `$hentai`){
conn.sendMessage(id , `*Selamat datang Di fitur hentai*\n\n*-------------------------------------------------*\n ⃝⃔Nekopoi\nhttp://nekopoi.care\n\n ⃝⃔Animeidhentai\nhttp://animeidhentai.com\n\n ⃝⃔kisshentai\nhttp://kisshentai.com\n\n ⃝⃔h-anime\nhttp://h-anime.com\n\n ⃝⃔Hentaipulse\nhttp://hentaipulse.com\n\n ⃝⃔hentaimama\nhttp://hentaimama.com\n\n ⃝⃔miniopai\nhttp://minioppai.org\n\n ⃝⃔yandex\nhttps://yandex.com\n\nJika Mau Memakai salah satu website silahkan Gunakan *VPN* terlebih dahulu` ,MessageType.text)
conn.sendMessage(id, `*Dosa Di Tanggung Sendiri Owner Tidak Ikut Campur*` ,MessageType.text);
}
else if (text == '$creator'){
            conn.sendContact(chatId, `6281311850715@c.us`);
}
else if (text == `Anjing lu`){
conn.sendMessage(id, `Kata Kotor Terdeteksi (Anjing lu) \n Jangan Ngomong Kasar Cuk` ,MessageType.text);
}
else if (text == `$listdaerah`){
conn.sendMessage(id, `Ambarawa, Ambon, Amlapura, Amuntai, Argamakmur, Atambua, Babo, Bagan Siapiapi, Kalteng, Bajawa, Balige, Balikpapan, Banda Aceh, Bandarlampung, Bandung, Bangkalan, Bangkinang, Bangko, Bangli, Banjar, Banjar Baru, Banjarmasin, Banjarnegara, Bantaeng, Banten, Bantul, Banyuwangi, Barabai, Barito, Barru, Batam, Batang, Batu, Baturaja, Batusangkar, Baubau, Bekasi, Bengkalis, Bengkulu, Benteng, Biak, Bima, Binjai, Bireuen, Bitung, Blitar, Blora, Bogor, Bojonegoro, Bondowoso, Bontang, Boyolali, Brebes, Bukit Tinggi, Maluku, Bulukumba, Buntok, Cepu, Ciamis, Cianjur, Cibinong, Cilacap, Cilegon, Cimahi, Cirebon, Curup, Demak, Denpasar, Depok, Dili, Dompu, Donggala, Dumai, Ende, Enggano, Enrekang, Fakfak, Garut, Gianyar, Gombong, Gorontalo, Gresik, Gunung Sitoli, Indramayu, Jakarta Barat, Jakarta Pusat, Jakarta Selatan, Jakarta Timur, Jakarta Utara, Jambi, Jayapura, Jember, Jeneponto, Jepara, Jombang, Kabanjahe, Kalabahi, Kalianda, Kandangan, Karanganyar, Karawang, Kasungan, Kayuagung, Kebumen, Kediri, Kefamenanu, Kendal, Kendari, Kertosono, Ketapang, Kisaran, Klaten, Kolaka, Kota Baru Pulau Laut, Kota Bumi, Kota Jantho, Kotamobagu, Kuala Kapuas, Kuala Kurun, Kuala Pembuang, Kuala Tungkal, Kudus, Kuningan, Kupang, Kutacane, Kutoarjo, Labuhan, Lahat, Lamongan, Langsa, Larantuka, Lawang, Lhoseumawe, Limboto, Lubuk Basung, Lubuk Linggau, Lubuk Pakam, Lubuk Sikaping, Lumajang, Luwuk, Madiun, Magelang, Magetan, Majalengka, Majene, Makale, Makassar, Malang, Mamuju, Manna, Manokwari, Marabahan, Maros, Martapura Kalsel, Sulsel, Masohi, Mataram, Maumere, Medan, Mempawah, Menado, Mentok, Merauke, Metro, Meulaboh, Mojokerto, Muara Bulian, Muara Bungo, Muara Enim, Muara Teweh, Muaro Sijunjung, Muntilan, Nabire, Negara, Nganjuk, Ngawi, Nunukan, Pacitan, Padang, Padang Panjang, Padang Sidempuan, Pagaralam, Painan, Palangkaraya, Palembang, Palopo, Palu, Pamekasan, Pandeglang, Pangka_, Pangkajene Sidenreng, Pangkalan Bun, Pangkalpinang, Panyabungan, Par_, Parepare, Pariaman, Pasuruan, Pati, Payakumbuh, Pekalongan, Pekan Baru, Pemalang, Pematangsiantar, Pendopo, Pinrang, Pleihari, Polewali, Pondok Gede, Ponorogo, Pontianak, Poso, Prabumulih, Praya, Probolinggo, Purbalingga, Purukcahu, Purwakarta, Purwodadigrobogan, Purwokerto, Purworejo, Putussibau, Raha, Rangkasbitung, Rantau, Rantauprapat, Rantepao, Rembang, Rengat, Ruteng, Sabang, Salatiga, Samarinda, Kalbar, Sampang, Sampit, Sanggau, Sawahlunto, Sekayu, Selong, Semarang, Sengkang, Serang, Serui, Sibolga, Sidikalang, Sidoarjo, Sigli, Singaparna, Singaraja, Singkawang, Sinjai, Sintang, Situbondo, Slawi, Sleman, Soasiu, Soe, Solo, Solok, Soreang, Sorong, Sragen, Stabat, Subang, Sukabumi, Sukoharjo, Sumbawa Besar, Sumedang, Sumenep, Sungai Liat, Sungai Penuh, Sungguminasa, Surabaya, Surakarta, Tabanan, Tahuna, Takalar, Takengon, Tamiang Layang, Tanah Grogot, Tangerang, Tanjung Balai, Tanjung Enim, Tanjung Pandan, Tanjung Pinang, Tanjung Redep, Tanjung Selor, Tapak Tuan, Tarakan, Tarutung, Tasikmalaya, Tebing Tinggi, Tegal, Temanggung, Tembilahan, Tenggarong, Ternate, Tolitoli, Tondano, Trenggalek, Tual, Tuban, Tulung Agung, Ujung Berung, Ungaran, Waikabubak, Waingapu, Wamena, Watampone, Watansoppeng, Wates, Wonogiri, Wonosari, Wonosobo, Yogyakarta` ,MessageType.text);
}
else if (text == '$nganuan'){
conn.sendMessage(id, `🔰 *MENU NGANUAN BOT|Azumi* 🔰\n\nhttps://mega.nz/folder/cVA3GY4a#wzNM8VcmI5N08bjbd8djJQ\n\nAV ±100TB\n\nhttps://drive.google.com/drive/mobile/folders/1ywOGvhksT5zEJFitOspDOtrayhd1usLR\n\nHentai + Jav ±145TB\n\nhttps://drive.google.com/drive/u/0/mobile/folders/1W0FHmq_IDRJ1C9fxKZ8amB6lN66m0klR\n\nBrazer 50GB\n\nhttps://mega.nz/folder/658l2Daa#4yw4s-gJqBPrLXHRagCr8g\n\nJav Full\n\nhttps://drive.google.com/folderview?id=1uws3kCC76n6sRf-epoLTP-tDHyoAE4XW \n\nNaughty Amerika\n\nhttps://drive.google.com/drive/u/0/mobile/folders/1Zz2WqxeRweiIwEsGFFGv_aoQMzc9aKpe \n\nKorean BJ\n\nhttps://drive.google.com/drive/u/0/mobile/folders/1cRJt725x94rGEOGK6HyXBijvIM3E5M_b \n\nIndo Size ??\n\nhttps://drive.google.com/drive/u/0/mobile/folders/1kV0Ow5blpyP5hT4QvfP8yTpI4THQtN4D \n\nLokal Size ??\n\nhttps://drive.google.com/drive/u/0/mobile/folders/1pZykTtNaoEgp7t3V9kmpb4aQKU88-x5X \n\nJAV 2 Size ??\n\nhttps://drive.google.com/drive/u/0/mobile/folders/15yZjGyMPiLP87gxk4ND2NdU1ufyBHP5k\n\nLIVANNA\n\nhttps://drive.google.com/file/d/1NixokX4Gr_3R14OKxR2nwNrDwuxdT7kO/view\n\nRandom\n\nhttps://drive.google.com/drive/folders/1UkCYgsIEkdxHVftugheWcFBLDvcwuMZv?usp=sharing\n\nYang sange pen nyari bahan\n\nhttp://porndude.com` ,MessageType.text)
conn.sendMessage(id, `*Dosa Di Tanggung Sendiri Owner Tidak Ikut Campur*` ,MessageType.text);                         }
else if (text == `Anjir`){
conn.sendMessage(id, `Kata Kotor Terdeteksi (Anjir) \n Jangan Ngomong Kasar Cuk` ,MessageType.text);                  }
else if (text == `$playmusic`){
conn.sendMessage(id,`🔰  *LIST MUSIC BOT|Azumi* 🔰\n*______________________________________________________*\n            \n*〲  🔰O1. Tryphobia*\n\n*〲 🔰 O2. Beautiful Lie*\n\n*〲 🔰 O3. Dynasty*\n\n*〲 🔰 O4. Clarity*\n\n*〲 🔰 O5. losing my mind*\n\n*〲 🔰 O6. Smith Dancin*\n\n*〲 🔰 O7. Imagination*\n\n*〲 🔰 O8. In another life*\n\n*〲 🔰 O9. Sweet scar*\n\n*〲 🔰 1O. Past live*\n\n*〲 🔰 11.xxxtentacion Changes*\n\n*〲 🔰 12. Play date*\n\n_*Contoh:$tryphobia*_\n\n*______________________________________________________*\n\n*[ NOTE = KALAU ADA YANG MAU REQUEST/NAMBAHIN  MUSIC LAGI CHAT OWNER ]*` ,MessageType.text);
}
else if (text == `$Tryphobia`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Tryphobia*\n\nhttps://drive.google.com/file/d/1ZGsSnR5U4l0sBn7twFKccATXoudps-rf` ,MessageType.text);
}
else if (text == `$Beautiful Lie`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Beautiful lie*\n\nhttps://drive.google.com/file/d/18EmLbhfpgxsI49uWaERe1l7Uzant1bII` ,MessageType.text);
}
else if (text == `$Beatiful lie`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Beautiful lie*\n\nhttps://drive.google.com/file/d/18EmLbhfpgxsI49uWaERe1l7Uzant1bII` ,MessageType.text);
}
else if (text == `$Dynasty`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Dynasty*\n\nhttps://drive.google.com/file/d/1jSy2M33lxLzvaGHHcyX0lqo7hQSi-U_2` ,MessageType.text);
}
else if (text == `$Clarity`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Clarity*\n\nhttps://drive.google.com/file/d/13ZYYCWXRhkfE-iexh6buQGyp30rYAoEU` ,MessageType.text);
}
else if (text == `$clarity`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Clarity*\n\nhttps://drive.google.com/file/d/13ZYYCWXRhkfE-iexh6buQGyp30rYAoEU` ,MessageType.text);
}
else if (text == `$losing my mind`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *losing my mind*\n\nhttps://drive.google.com/file/d/1FdyMxzI1WeR9KwnDGmeaDWzDYwxqitTL/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$Smith dancin`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Smith dancin*\n\nhttps://drive.google.com/file/d/1FgAm4Ap8LQeQSto21Jp5-hDtcj1pz-ct/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$Imagination`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *imagination*\n\nhttps://drive.google.com/file/d/1FgAsiARdviwY7TeyK0Lq9l0nzaJ-d1pM/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$imagination`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *imagination*\n\nhttps://drive.google.com/file/d/1FgAsiARdviwY7TeyK0Lq9l0nzaJ-d1pM/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$In another life`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *in another life*\n\nhttps://drive.google.com/file/d/1FlLKDivcyenqLuAnaDpC4PHoUujzM1h3/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$in another life`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *in another life*\n\nhttps://drive.google.com/file/d/1FlLKDivcyenqLuAnaDpC4PHoUujzM1h3/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$sweet scar`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *SWEET SCAR*\n\nhttps://drive.google.com/file/d/1G2XoSRFwtf8cyjM-5Y00KbO82N8e2p_f/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$Sweet scar`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *SWEET SCAR*\n\nhttps://drive.google.com/file/d/1G2XoSRFwtf8cyjM-5Y00KbO82N8e2p_f/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$Past life`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *Past live*\n\nhttps://drive.google.com/file/d/1G06n27QQ6u4cEOQD3GX7pFjPWpy-JNAv/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$xxxtentacion changes`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *XXXTENTACION Changes*\n\nhttps://drive.google.com/file/d/1FyEjh26i69LCMZGCLbxMATqQulmf2SQh/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$xxxtentacion Changes`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *XXXTENTACION Changes*\n\nhttps://drive.google.com/file/d/1FyEjh26i69LCMZGCLbxMATqQulmf2SQh/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$Play date`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *play date*\n\nhttps://drive.google.com/file/d/1GFfkINMvy5r55_k9vQoXiB4lj8Yhgnls/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$play date`){
conn.sendMessage(id, `*┊ ░⃟🌹๋ོ࣭ꦿ* *play date*\n\nhttps://drive.google.com/file/d/1GFfkINMvy5r55_k9vQoXiB4lj8Yhgnls/view?usp=drivesdk` ,MessageType.text);
}
else if (text == `$snk`){
conn.sendMessage(id, `Syarat dan Ketentuan Bot *Azumi | BOT*\n1. Teks dan nama  WhatsApp anda akan kami simpan di dalam server selama bot aktif\n2. Data anda akan di hapus ketika bot Offline\n3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim\n4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi\n5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot\n6. Apapun yang anda perintah pada bot ini, *KAMI TIDAK AKAN BERTANGGUNG JAWAB!*\n7. Patuhin Rules Yang ada Jangan \nSpam , Jangan Telfon , Jangan\n VC\n8. Bot di lengkapi fitur Filter chat \nbawaan\n\nTerimakasih....` ,MessageType.text);
}
else if (text == `$ceklimit`){
conn.sendMessage(id, `Karena Banyak Yang Donasi >_< Jadi Limit Anda *_Unlimited_* Jadi Sering Sering Donasi Yah >_<` ,MessageType.text);
}
else if (text == `$nekopoi`){
conn.sendMessage(id, `Title: [3D] Kancolle MMD SEX Yamato and Musashi Fuck – NekoPoi\n\nLink:\n\nhttps://linkpoi.me/ked6M\nhttps://ouo.io/bv7Nf2\nhttps://linkpoi.me/alB62\nhttps://linkpoi.me/zIGJR\nhttps://linkpoi.me/TmDgl\nhttps://linkpoi.me/8LehS\nhttps://linkpoi.me/uvOLL\nhttps://ouo.io/H1BiZg\nhttps://linkpoi.me/STKTv\nhttps://ouo.io/9TOTIJ\nhttps://linkpoi.me/3UiY2\nhttps://linkpoi.me/Z8OdQ\nhttps://linkpoi.me/7q8Y5\nhttps://linkpoi.me/L83AG\nhttps://linkpoi.me/rcO0v\nhttps://ouo.io/zVe1Uu\nhttps://linkpoi.me/OJZxX\nhttps://ouo.io/V8MxSJ\nhttps://linkpoi.me/zVkD2\nhttps://linkpoi.me/yR6en\nhttps://linkpoi.me/pG72T\nhttps://linkpoi.me/xKGdV\nhttps://linkpoi.me/GjiQE\nhttps://ouo.io/YI2Wv1\n\nNekopoinya om:v` ,MessageType.text);
conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
}
else if (text== `$alkitab`){
conn.sendMessage(id, `Fitur ini sedang dalam perbaikan karna dari api nya eror....` ,MessageType.text);
}
if (text.includes("$ceritasex1")){
const teks = text.replace(/$ceritasex1 /, "")
axios.get(`https://arugaz.herokuapp.com/api/cersex1`).then((res) =>{
let hasil = `${res.data.result.article}`
conn.sendMessage(id, hasil ,MessageType.text);
})                                                                                                   }
 if (text.includes("$ceritasex2")){
const teks = text.replace(/$ceritasex2 /, "")
axios.get(`https://arugaz.herokuapp.com/api/puisi2`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$indohot")){
const teks = text.replace(/$indohot /, "")
axios.get(`https://arugaz.herokuapp.com/api/indohot`).then((res) =>{
let hasil = `*Judul* : ${res.data.result.judul}\n*Country* : ${res.data.result.country}\n*Genre* : ${res.data.result.genre}\n*Durasi* : ${res.data.result.durasi}\n*Link* : ${res.data.result.url}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes('$cooltext')){
  var teks = text.replace(/$cooltext /, '')
    axios.get('https://api.haipbis.xyz/randomcooltext?text='+teks)
    .then((res) => {
      imageToBase64(res.data.image)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}
if (text.includes("$twitstalk")){
const teks = text.replace(/$twitstalk /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twstalk?username=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*➸Name* : ${res.data.name}\n*➸Full Name* : ${res.data.full_name}\n*➸ID* : ${res.data.id}\n*➸Followers* : ${res.data.followers_count}\n*Profile* : ${res.data.profile_pic}`
conn.sendMessage(id,hasil, MessageType.text);
})
}
if (text.includes("$anime")){
const teks = text.replace(/$anime /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/kuso?q=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*Title* : ${res.data.title}\n*Info* : ${res.data.info}\n\n*Thumb* : ${res.data.thumb}\n\n*Download* : ${res.data.link_dl}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$chord")){
const teks = text.replace(/$chord /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/chord?q=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*➸CHORD*\n ${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$join")){
const teks = text.replace(/$join /, "")
conn.sendMessage(id,`Silahkan Masukkan Bot Secara Manual.`, MessageType.text);
}
if (text.includes("$puisi1")){
const teks = text.replace(/$puisi1 /, "")
axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$fb")){
const teks = text.replace(/$fb /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/epbe?url=${teks}&apiKey=${api}`).then((res) => {
        conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageTypee.text);
    let hasil = `*Title* : ${res.data.title}\n*Publish* : ${res.data.published}\n*File size* : ${res.data.filesize}\n*Link* : ${res.data.result}`
    conn.sendMessage(id, hasil ,MessageType.text);
})
}
else if (text == `$block`){
conn.sendMessage(id, `*[!]* Perintah ini hanya khusus owner bot Azumi` ,MessageType.text);             
else if (text == `$grupofficialbot`){
conn.sendMessage(id, `*GRUP* : *_(TWB)🤖_*\n*LINK GRUP* : _https://chat.whatsapp.com/IujvcBtCiaoChP0qCQsLhc_\n\n_Bagi Yang Mau Join Pencet Link Diatas Kita Berbagi Ilmu seputar termux_\n*#BotTermux*\n*#Sharingilmu*\n*#Whatsappbot*\n*#AzumiOfficial*\n*#IzinAdmin*` ,MessageType.text);
}) }
	
if (text.includes("$quotes2")){
const teks = text.replace(/$quotes2 /, "")
axios.get(`https://arugaz.herokuapp.com/api/randomquotes`).then((res) =>{
let hasil = `*Author* : ${res.data.author}\n\n*Quotes* : _${res.data.quotes}_`
conn.sendMessage(id, hasil, MessageType.text);
})   
}
if (text.includes("$searchmovie")){                                                                      const teks = text.replace(/$searchmovie /, "")
axios.get(`https://arugaz.herokuapp.com/api/sdmovie?film=${teks}`).then((res) =>{
let hasil = `*Title* : ${res.data.result.title}\n*Rating* : ${res.data.result.rating}\n*Sinopsis* : ${res.data.result.sinopsis}\n\n*Thumb* : ${res.data.result.thumb}\n\n*Video* : ${res.data.result.video}`
conn.sendMessage(id, hasil, MessageType.text);                                                       })                                                                                                   }

if (text.includes("$namaninja")){
const teks = text.replace(/$namaninja /, "")
axios.get(`https://api.terhambar.com/ninja?nama=${teks}`).then((res) =>{
let hasil = `*Nama Kamu* : ${teks}\n*Nama Ninja* : ${res.data.result.ninja}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$kbbi")){
const teks = text.replace(/$kbbi /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/kbbi?query=${teks}&lang=id&apiKey=${api}`).then((res) =>{
let hasil = `*KBBI* : \n${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$jadwaltv")){
const teks = text.replace(/$jadwaltv /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/jdtv?ch=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*TV* : *${teks}*\n\n${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);                                                                       
})
}
if (text.includes("$quotes3")){
const teks = text.replace(/$quotes3 /, "")
axios.get(`http://mhankbarbar.herokuapp.com/api/quotesnime/random`).then((res) =>{
let hasil = `*Anime* : ${res.data.data.anime}\n*Chara* ; ${res.data.data.chara}\n\n*Quotes* : ${res.data.data.quote}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$resep")){
const teks = text.replace(/$resep /, "")
axios.get(`https://arugaz.herokuapp.com/api/resep?query=${teks}`).then((res) =>{
let hasil = `*Title* : ${res.data.result.title}\n*Key* : ${res.data.result.key}\n*difficulty* : ${res.data.result.difficulty}\n*Untuk* ${res.data.result.serving}\n*Waktu* : ${res.data.result.times}\n*Thumb* : ${res.data.result.thumb}\n_________________________________________\n*Title* : ${res.data.result.title}\n*Key* : ${res.data.result.key}/x`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$manga")){
const teks = text.replace(/$manga /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/komiku?q=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*Judul* : ${res.data.info}\n*Genre* : ${res.data.genre}\n\n*Sinopsis* : ${res.data.sinopsis}\n\n*Thumb* : ${res.data.thumb}\n\n*Download* : ${res.data.link_dl}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$ipadress")){
const teks = text.replace(/$ipadress /, "")
axios.get(`https://mnazria.herokuapp.com/api/check?ip=${teks}`).then((res) =>{
let hasil = `*City* : ${res.data.city}\n*Latitude* : ${res.data.latitude}\n*Longtitude* : ${res.data.longitude}\n*Region* : ${res.data.region_name}\n*Region Code* : ${res.data.region_code}\n*IP* : ${res.data.ip}\n*Type* : ${res.data.type}\n*zip* : ${res.data.zip}\n*Geonime* : ${res.data.location.geoname_id}\n*Capital* : ${res.data.location.capital}\n*Calling* : ${res.data.location.calling_code}\n\n*Country Flag* : ${res.data.location.country_flag}\n\n*CountryFlagEmoji* : ${res.data.location.country_flag_emoji}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$line")){
const teks = text.replace(/$line /, "")
axios.get(`https://mnazria.herokuapp.com/api/line`).then((res) =>{
let hasil = `*APP_VERSION* : ${res.data.ANDROID.APP_VERSION}\n*LA* : ${res.data.ANDROID.LA}\n*NOTE* : ${res.data.ANDROID.NOTE}\n*UA* : ${res.data.ANDROID.UA}\n*VERSION* : ${res.data.ANDROID.SYSTEM_VERSION}`
conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$cerpen")){
const teks = text.replace(/$cerpen /, "")
axios.get(`https://arugaz.herokuapp.com/api/cerpen`).then((res) =>{
let hasil = `${res.data.result}`
conn.sendMessage(id, hasil, MessageType.text);
})
}



if (text.includes("$harinasional")){
  const teks = text.replace(/$harinasional /, "")
  axios.get(`https://api.haipbis.xyz/harinasional?tanggal=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
  let hasil = `menurut tanggal ${teks} adalah\n\n *Tanggal* : _${res.data.tanggal}_ \n *Keterangan* : _${res.data.keterangan}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text.includes("$kodenuklir")){
const teks = text.replace(/$kodenuklir /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/nhentai?type=search&query=${teks}&apiKey=${api}`).then((res) =>{
let hasil = `*Code* \n${res.result.data.data-tags}\n{res.data.result.id}`
conn.sendMessage(id, hasil, MessageType.text);
})
}




//end



})



