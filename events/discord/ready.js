// events/discord/ready.js
module.exports = async (client) => {
  console.log(`${client.user.tag} olarak giriş yapıldı ve hazır!`);
  console.log(`Bot ${client.guilds.cache.size} sunucuda hizmet veriyor.`);
  
  // // --- AŞAĞIDAKİ SATIRLARI GEÇİCİ OLARAK YORUM SATIRI YAPTIM (SORUN ÇÖZÜLENE KADAR) ---
  // try {
  //   console.log("Komutlar senkronize ediliyor...");
  //   await require('../../utils/slashsync')(client);
  //   console.log("Slash komutları başarıyla senkronize edildi.");
  // } catch (error) {
  //   console.error("[HATA] Slash komutları senkronize edilirken hata oluştu:", error);
  // }
  // // --- YORUM SATIRI SONU ---
};
