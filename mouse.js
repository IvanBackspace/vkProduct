const { trezvostrehabLinks } = require('./arr');

const puppeteer = require('puppeteer');
(async () => {
    const browserURL = 'http://localhost:9222'; // URL для подключения к существующему браузеру
    const browser = await puppeteer.connect({ browserURL });


    const page = await browser.newPage();




  
    
    

    


    await page.waitForTimeout(1000);
    await page.exposeFunction('onMouseMove', (x, y) => {
      console.log(`Координаты курсора: x=${x}, y=${y}`);
    });
  
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('mousemove', (e) => {
        window.onMouseMove(e.clientX, e.clientY);
      });
    });
    
    await page.goto(`https://vk.com/stop_alko_serpuhov`)
  
  
    await page.waitForTimeout(1000000);



    await browser.disconnect();
// 520 1018
})();

