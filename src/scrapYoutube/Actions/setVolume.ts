import type { Page } from 'puppeteer'

export default async function setVolume(page: Page, value: number) {
	// Asegúrate de que el valor del volumen esté entre 0 y 100
	if (value < 0 || value > 100)
		throw new Error('El valor del volumen debe estar entre 0 y 100')
	await page.waitForSelector('video')
	await page.evaluate((volume) => {
		const videoElement = document.querySelector('video')
		if (videoElement) {
			videoElement.volume = volume / 100 // Convertir el valor a un rango de 0 a 1
		}
	}, value)
}
