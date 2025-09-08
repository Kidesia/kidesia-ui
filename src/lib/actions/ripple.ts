export function ripple(node: HTMLElement, enabled = true) {
	async function handleRipple(event: TouchEvent | MouseEvent) {
		if (!node || !enabled) return;

		node.classList.add('ripple-container');

		const isTouchEvent = event instanceof TouchEvent;
		const eventX = isTouchEvent ? (event.touches[0]?.clientX ?? 0) : event.clientX;
		const eventY = isTouchEvent ? (event.touches[0]?.clientY ?? 0) : event.clientY;

		const buttonRect = node.getBoundingClientRect();
		const diameter = Math.max(buttonRect.width, buttonRect.height);
		const radius = diameter / 2;

		const circle = document.createElement('span');
		circle.style.width = circle.style.height = `${diameter}px`;
		circle.style.left = `${eventX - buttonRect.left - radius}px`;
		circle.style.top = `${eventY - buttonRect.top - radius}px`;
		circle.classList.add('ripple');

		const ripple = node.getElementsByClassName('ripple')[0];
		if (ripple) {
			ripple.remove();
		}

		node.appendChild(circle);
	}

	node.addEventListener('touchstart', handleRipple);
	node.addEventListener('mousedown', handleRipple);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleRipple);
			node.removeEventListener('mousedown', handleRipple);
		}
	};
}
