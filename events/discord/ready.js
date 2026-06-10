const register = require('../../utils/slashsync');
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: '1'
  })), {
    debug: true
  });
  // Slash komutlarını kaydet - (Eğer kodları okuyanlardansanız, bunu göz ardı etmenizi öneririm çünkü gerçekten çok kötü yapıyorum, teşekkürler LMAO)
  console.log(`[ / | Slash Komutu ] - ✅ Tüm slash komutları yüklendi!`)
  let invite = `https://discord.com/oauth2/authorize?client_id=1411630023294586931&permissions=8&integration_type=0&scope=bot`;
  console.log(`[STATÜ] ${client.user.tag} şu an çevrimiçi!\n[BİLGİ] Bot Arx tarafından yapıldı ${invite}`);
  client.user.setPresence({
  activities: [{ name: `By Arx.`, type: ActivityType.Watching }],
  status: 'dnd',
});

};
