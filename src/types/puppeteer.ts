import type { Browser, Page } from "puppeteer";

// TODO: add more properties if needed
export interface Puppeteer {
	browser: Browser;
	page: Page;
	// NOTE:  pageMusic don't have type yet
	pageMusic: Page;
}
