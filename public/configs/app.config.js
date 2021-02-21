module.exports = {
  platform: process.platform,
  port: process.env.PORT ? process.env.PORT : 3000,
  title: "KADE",
  languages: ["en", "jp", "es"],
  fallbackLng: "en",
  namespace: "translation"
};
