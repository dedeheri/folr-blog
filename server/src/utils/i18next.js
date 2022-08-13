const i18next = require("i18next");
const backendI18next = require("i18next-fs-backend");
const middlewareI18next = require("i18next-http-middleware");

function handleMultiLanguage(req, res) {
  console.log(req.cookies.lang);
  return i18next
    .use(backendI18next)
    .use(middlewareI18next.LanguageDetector)
    .init({
      fallbackLng: "en",
      backend: {
        loadPath: "../../assets/language/{{lng}}/translation.json",
      },
    });
}

module.exports = handleMultiLanguage;
