const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch({ headless: true, slowMo: 500 });
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it.only('static page', async () => {
        await page.goto('http://127.0.0.1:5500/');

        const titles = await page.$$eval('.head span', (spans) => spans.map(s => s.textContent)) // хваща всички спанове и изпълнява функция върху тях
        expect(titles).includes('Scalable Vector Graphics')
        expect(titles).includes('Open standard')
        expect(titles).includes('Unix')
        expect(titles).includes('ALGOL')

        const content = await page.textContent('.head span');
        expect(content).to.contain('Scalable Vector Graphics');

    });

    it('toggles content', async () => {
        await page.goto('http://127.0.0.1:5500/');

        await page.click('#main:first-child >> text=More');// цъкни на 'Моre' в първото дете на маин
        //ако е 'Моre' е case-insensitive, partial match
        //ако е '"More"' full match only, case sensitive
        await page.waitForSelector('#main:first-child >> .extra p'); // теста изчаква в браузъра да се появи нещо със съответния селектор

        const visible = await page.isVisible('#main:first-child >> .extra p');

        expect(visible).to.be.true;
    });

    it.only('toggles content', async () => {
        await page.goto('http://127.0.0.1:5500/');

        await page.click('#main:first-child >> text=More');
        await page.waitForSelector('#main:first-child >> .extra p');
        await page.click('#main:first-child >> text=Less');


        const visible = await page.isVisible('#main:first-child >> .extra p');
        expect(visible).to.be.false;

        // await page.$$('') // $$ взима целия хтмл елемент
    });

});