function main() {
	// scroller_
	const scrollerElement = document.querySelectorAll(
		'div[class*="scroller_"]',
	)[1]
	if (scrollerElement) {
		scrollerElement.scrollTop = scrollerElement.scrollHeight
	}

	const elementHref_div = document.querySelector(
		'div[data-text-variant="text-xs/normal',
	)
	console.log(elementHref_div)
	// elementHref_div.click()
	// for (const element of elementHref_div) {
	// }
}
main()
// Programadores y Estudiantes | Comunidad de Programación
