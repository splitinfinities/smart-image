/**
 * Gives a CSS custom property value applied at the element
 * element {Element}
 * varName {String} without '--'
 *
 * For example:
 * readCssVar(document.querySelector('.box'), 'color');
 */
export function readCssVar(element: HTMLElement, varName: string) {
	const elementStyles = getComputedStyle(element);
	return elementStyles.getPropertyValue(`--${varName}`).trim();
}

/**
 * Writes a CSS custom property value at the element
 * element {Element}
 * varName {String} without '--'
 *
 * For example:
 * readCssVar(document.querySelector('.box'), 'color', 'white');
 */
export function writeCssVar(element: HTMLElement, varName: string, value: string) {
  return element.style.setProperty(`--${varName}`, value);
}

/**
 * Writes multiple CSS custom property values on the element
 * element {Element}
 * varName {String} without '--'
 *
 * For example:
 * readCssVar(document.querySelector('.box'), 'color', 'white');
 */
export function updateStyles(element: HTMLElement, customProperties: any) {
	for (let varName in customProperties) {
		if (customProperties[varName] !== "var(--)") {
			element.style.setProperty(varName, customProperties[varName]);
		}
	}

	return true;
}
