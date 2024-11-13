// // @ts-nocheck

// function main() {}
// main()
// // Programadores y Estudiantes | Comunidad de Programación

// // Función para observar cambios dentro de un contenedor específico
// function observeContainerChanges(containerSelector, targetSelector, callback) {
// 	// Primero esperamos a que exista el contenedor
// 	function findContainer() {
// 		const container = document.querySelector(containerSelector)
// 		if (container) {
// 			setupContainerObserver(container)
// 		} else {
// 			// Si el contenedor aún no existe, seguimos buscando
// 			requestAnimationFrame(findContainer)
// 		}
// 	}

// 	// Configurar el observer para el contenedor
// 	function setupContainerObserver(container) {
// 		// Configuración del observer
// 		const config = {
// 			childList: true, // Observa cambios en hijos directos
// 			subtree: true, // Observa cambios en todo el árbol del contenedor
// 			attributes: false, // No observamos cambios de atributos
// 		}

// 		// Callback que se ejecuta cuando hay cambios
// 		const mutationCallback = (mutationsList) => {
// 			// Verificar si hay nuevos elementos que coincidan con el selector
// 			const newElements = container.querySelectorAll(targetSelector)
// 			newElements.forEach((element) => {
// 				// Verificamos si ya hemos procesado este elemento
// 				if (!element.dataset.observed) {
// 					element.dataset.observed = 'true'
// 					callback(element)
// 				}
// 			})
// 		}

// 		// Crear una instancia de MutationObserver
// 		const observer = new MutationObserver(mutationCallback)

// 		// Comenzar a observar
// 		observer.observe(container, config)

// 		// Verificar elementos existentes
// 		const existingElements = container.querySelectorAll(targetSelector)
// 		existingElements.forEach((element) => {
// 			if (!element.dataset.observed) {
// 				element.dataset.observed = 'true'
// 				callback(element)
// 			}
// 		})

// 		// Retornamos el observer por si necesitamos detenerlo después
// 		return observer
// 	}

// 	// Comenzar a buscar el contenedor
// 	findContainer()
// }

// // Ejemplo de uso:
// /*
// observeContainerChanges(
//     '#miContenedor',           // Selector del contenedor
//     '.elemento-dinamico',      // Selector de los elementos a observar
//     (elemento) => {            // Callback cuando se encuentra un elemento
//         console.log('Nuevo elemento encontrado:', elemento);
//         // Hacer algo con el elemento
//     }
// );
// */

// colorPrimary
