/**
 * @description the faucetman module's main entry point
 */
// initialize all basic constants of the module
const timer = require('./timer');
const puppeteer = require('puppeteer');
const url = require('url');
console.log(`Faucetman: started at ${timer.started}`);


(async () => {
	/** @todo: move this hardcore outside the module (somewhere to tasks config) */
	const paths = {
		target: url.parse('http://getfree.co.in/'),
		screenshots: 'cache/screenshots/',
		filename: '.png'
	};
	paths.filename = '' + paths.screenshots + paths.target.hostname + paths.filename;
	console.log(`Faucetman: Initialized local variables and ready to GO! [+${timer.elapsed}ms.]`);

	// initialize the browser and open new page
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// navigate the page to a target URL
	await page.goto(paths.target.href);
	console.log(`Faucetman: launched the puppeteer's browser page at ${paths.target.href} [+${timer.elapsed}ms.]`);

	// take the page screenshot
	await page.screenshot({
		path: paths.filename
	});
	console.log(`Faucetman: screenshot saved to ${paths.filename} [+${timer.elapsed}ms.]`);

	// finally close the browser
	await browser.close();
	console.log(`Faucetman: finished and closed the browser; Took: ${timer.elapsed}ms.`);
})();
