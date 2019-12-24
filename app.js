const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  //Busca no google
  async function google_search() {
    //Seleciona a url
    await page.goto("https://google.com");
    //Faz o input na pesquisa
    await page.evaluate(() => {
      document.querySelector('input[name="q"]').value = "JavaScript";
    });
    //Aperta a tecla "enter"
    await page.keyboard.press("Enter");
    //Loop na tecla "tab"
    for (let i = 0; i < 31; i++) {
      await page.keyboard.press("Tab", { delay: 100 });
    }
    //Enter para entrar na página
    await page.keyboard.press("Enter");
  }

  //Abre um video no Youtube
  async function youtube_video() {
    await page.goto("https://youtube.com");
    await page.evaluate(() => {
      document.querySelector('input[name="search_query"]').value = "GitHub";
    });
    await page.click("button#search-icon-legacy");
    const data = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll(`a#video-title`));
      return links.map(link => link.href).slice(0, 10);
    });

    console.log(data);
  }

  youtube_video();
  //await browser.close();
})();
