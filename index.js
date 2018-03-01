/**
 * @description the faucetman module's main entry point
 */
// initialize all basic constants of the module
const timer = require('./timer/index');
const logger = require('./logger/index')('Faucetman');

const config = require('config');
const puppeteer = require('puppeteer');
const url = require('url');

logger.log(`started at ${new Date(timer.started).getUTCDate()}`);

(async () => {
	/** @todo: move this hardcore outside the module (somewhere to tasks config) */

	// initialize the browser and open new page
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	// configure the useragent properties
	const viewport = config.get('app.useragent.viewport');
	page.setViewport(viewport);

	// get the configuration for tasks and targets
	const faucets = config.get('faucets');
	const tasks = config.get('tasks');

	logger.log('initialized local variables and ready to go', `+[${timer.elapsed}ms.]`);
	do {
		let task = tasks.shift(),
			faucet = faucets[task.name],
			location = url.parse(faucet.urls.home),
			filename = `${config.get('app.dirs.screenshots')}${location.hostname}.png`;

		// navigate the faucet homepage URL
		logger.log(`fond the target page URL to go to: ${location.href}`, `+[${timer.elapsed}ms.]`);
		await page.goto(location.href);
		logger.log(`puppeteer ${location.href} page loaded`, `+[${timer.elapsed}ms.]`);

		// take the homepage screenshot
		await page.screenshot({ path: filename });
		logger.log(`faucet's ${location.href} page screenshot saved to ${filename}`, `+[${timer.elapsed}ms.]`);

	} while (tasks.length > 0);

	// finally close the browser
	await browser.close();
	logger.log('finished all tasks and released the browser', 'Total time:', timer.elapsed, 'ms.');
})();
