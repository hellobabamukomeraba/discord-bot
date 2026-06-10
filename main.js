const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

  const command = client.interactions.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Komut çalıştırılırken bir hata oluştu.',
      ephemeral: true
    });
  }
});

const fs = require("fs");

// === 7/24 AKTIFLIK ICIN EKLENEN KOD BASLANGIC ===
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot 7/24 aktif durumda');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP sunucusu ${PORT} portunda calisiyor - 7/24 aktiflik icin`);
});

setInterval(() => {
  console.log(`[7/24] Bot aktif - ${new Date().toLocaleString()}`);
}, 300000);
// === 7/24 AKTIFLIK ICIN EKLENEN KOD BITIS ===

// Discord cekilislerini baslat
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#2F3136",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Son sans, katilmak icin acele et!** 🛑`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});

/* Tum olaylari yukle (Discord tabanli) */
fs.readdir("./events/discord", (_err, files) => {
  if (_err) {
    console.log("[HATA] events/discord klasoru bulunamadi");
    return;
  }
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Olay]   ✅  Yuklendi: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

/* Tum olaylari yukle (cekilis tabanli) */
fs.readdir("./events/giveaways", (_err, files) => {
  if (_err) {
    console.log("[HATA] events/giveaways klasoru bulunamadi");
    return;
  }
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Olay]   🎉 Yuklendi: ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client));
    delete require.cache[require.resolve(`./events/giveaways/${file}`)];
  });
});

// Komutlar koleksiyon olarak tanimlaniyor (mesaj komutlari)
client.commands = new Discord.Collection();
/* Tum komutlari yukle */
fs.readdir("./commands/", (_err, files) => {
  if (_err) {
    console.log("[HATA] commands klasoru bulunamadi");
    return;
  }
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`[Komut] ✅  Yuklendi: ${commandName}`);
  });
});

// Etkilesimler koleksiyon olarak tanimlaniyor (slash komutlari)
client.interactions = new Discord.Collection();
client.register_arr = [];
/* Tum slash komutlari yukle */
fs.readdir("./slash/", (_err, files) => {
  if (_err) {
    console.log("[HATA] slash klasoru bulunamadi");
    return;
  }
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props);
  });
});

// ISTEMCI ILE GIRIS YAP - KESIN COZUM
const BOT_TOKEN = process.env.DISCORD_TOKEN;
if (!BOT_TOKEN) {
  console.error("[HATA] DISCORD_TOKEN environment degiskeni bulunamadi!");
  console.error("[HATA] Lutfen Render'daki Environment sekmesine DISCORD_TOKEN ekleyin ve dogru token degerini girin.");
  console.error("[HATA] Token almak icin: Discord Developer Portal -> Bot -> Reset Token -> Kopyala -> Render'a yapistir.");
  process.exit(1);
}

// Rol kontrolü için event
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  const allowedRoleId = '1514373793538244789';
  
  // Eğer komutla başlıyorsa (prefix !)
  if (message.content.startsWith('!')) {
    const member = message.member;
    if (!member.roles.cache.has(allowedRoleId)) {
      return message.reply({ content: '❌ Bu komutu kullanmak için yetkiniz yok! Sadece özel role sahip kişiler kullanabilir.', ephemeral: true });
    }
  }
});

console.log("[BILGI] Token basariyla alindi. Bot Discord'a baglaniyor...");
client.login(BOT_TOKEN);

