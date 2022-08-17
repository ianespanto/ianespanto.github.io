/**
 * returns the absolute position of an element regardless of position/float issues
 * @param {HTMLElement} el - element to return position for
 * @returns {object} { x: num, y: num }
 */
export function getPosition(el) {
	let x = 0;
	let y = 0;

	do {
		x += el.offsetLeft || 0;
		y += el.offsetTop || 0;
		el = el.offsetParent;
	} while (el);

	return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

/**
 * Get accurate viewport width and height
 * Example: viewport().w
 */
export function viewport() {
	let e = window,
		a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { w: e[a + 'Width'], h: e[a + 'Height'] };
}

export function boundNumber(min, max, number) {
	return Math.min(Math.max(min, number), max);
}

export function delayRedirect(e, link, navigate, setTrans, instant) {
	e.preventDefault();
	setTrans(instant ? false : true);
	// console.log('page transition start', link);

	setTimeout(
		() => {
			navigate(link);
			// console.log('exit complete', link);
		},
		instant ? 0 : 1700
	);
}
