export const puppeteerConfig = {
  whatsappUrl: 'https://web.whatsapp.com',
  useragentOverride:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  chromiumArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-infobars',
    '--ignore-certificate-errors',
    '--disable-web-security',
    '--window-position=0,0',
    '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.91 Safari/537.36"',
    '--ignore-certificate-errors',
  ],
};
