module.exports = {
  // Bu 'execute' fonksiyonu, main.js'teki komut işleyicinin beklediği yapıdır.
  async execute(client, message, args) {
    // Ping'i hesapla
    const apiPing = client.ws.ping;

    // Kullanıcıya gönderilecek mesajı hazırla
    await message.reply(`Pong! 🏓 API Gecikmesi: **${apiPing}ms**`);
  }
};
