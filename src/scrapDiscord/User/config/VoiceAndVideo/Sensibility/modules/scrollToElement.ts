import type { Page } from 'puppeteer'

export default async function scrollToElement(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	page.evaluate(() => {
		function main() {
			const property = 'Sensibilidad de entrada'
			const divElements = document.querySelectorAll('h3')
			let elementOption = null

			// Busca el elemento que contiene el texto especificado
			for (const element of Array.from(divElements)) {
				// @ts-ignore
				if (element.innerText.toLowerCase().includes(property.toLowerCase())) {
					// @ts-ignore
					elementOption = element.parentNode
						.querySelector('div')
						.querySelector('section')
				}
			}

			// Si no encuentra el elemento, salir de la función
			if (!elementOption) {
				console.error('Elemento no encontrado')
				return
			}

			// Selecciona el contenedor con scroll
			const classScroll =
				'contentRegionScroller_c25c6d contentRegionShownSidebar_c25c6d auto_c49869 scrollerBase_c49869'
			const elementScroll = document.querySelector(
				`div[class="${classScroll}"]`,
			)

			// Asegúrate de que el contenedor de scroll existe
			if (!elementScroll) {
				console.error('Contenedor con scroll no encontrado')
				return
			}

			// Calcula la posición del elemento dentro del viewport
			const elementTop = elementOption.getBoundingClientRect().top

			// Calcula la posición del elemento dentro del contenedor con scroll
			const elementPosition = elementTop + elementScroll.scrollTop

			// Ajusta la posición para que el elemento quede centrado
			const scrollPosition = elementPosition - elementScroll.clientHeight / 2

			// Realiza el scroll si la posición es diferente a la actual
			if (elementScroll.scrollTop !== scrollPosition) {
				elementScroll.scrollTo({
					top: scrollPosition,
					behavior: 'smooth', // Añadir scroll suave (opcional)
				})
			}
		}

		main()
	})
}
