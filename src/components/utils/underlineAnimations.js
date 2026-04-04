import { gsap } from 'gsap';

export function getUnderlineVars({ open, origin, activeOpacity = 1, inactiveOpacity = 0.7 }) {
	return {
		'--underline-scale-x': open ? 1 : 0,
		'--underline-opacity': open ? activeOpacity : inactiveOpacity,
		'--underline-origin-x': origin || (open ? '0%' : '100%'),
	};
}

export function setUnderlineState(element, options) {
	if (!element) {
		return;
	}

	const vars = getUnderlineVars(options);

	Object.entries(vars).forEach(([name, value]) => {
		element.style.setProperty(name, `${value}`);
	});
}

export function tweenUnderline(element, { activeClassName, onComplete, ...options } = {}) {
	if (!element) {
		return null;
	}

	const vars = getUnderlineVars(options);

	if (activeClassName) {
		element.classList.toggle(activeClassName, Boolean(options.open));
	}

	element.style.setProperty('--underline-origin-x', vars['--underline-origin-x']);

	return gsap.to(element, {
		'--underline-scale-x': vars['--underline-scale-x'],
		'--underline-opacity': vars['--underline-opacity'],
		duration: options.duration ?? 0.45,
		ease: options.ease ?? 'power4.out',
		overwrite: true,
		onComplete,
	});
}

export function createQueuedUnderlineController({
	element,
	activeClassName,
	activeOpacity = 1,
	inactiveOpacity = 0.7,
	duration = 0.45,
	ease = 'power4.out',
}) {
	const state = {
		hovered: false,
		leaveQueued: false,
		tween: null,
	};

	const playOut = () => {
		state.leaveQueued = false;
		state.tween = tweenUnderline(element, {
			open: false,
			origin: '100%',
			activeClassName,
			activeOpacity,
			inactiveOpacity,
			duration,
			ease,
			onComplete: () => {
				state.tween = null;
			},
		});
	};

	const playIn = () => {
		state.leaveQueued = false;
		state.tween = tweenUnderline(element, {
			open: true,
			origin: '0%',
			activeClassName,
			activeOpacity,
			inactiveOpacity,
			duration,
			ease,
			onComplete: () => {
				state.tween = null;

				if (state.leaveQueued && !state.hovered) {
					playOut();
				}
			},
		});
	};

	const enter = () => {
		state.hovered = true;
		state.leaveQueued = false;
		playIn();
	};

	const leave = () => {
		state.hovered = false;

		if (state.tween) {
			state.leaveQueued = true;
			return;
		}

		playOut();
	};

	const reset = ({ open = false, origin } = {}) => {
		if (state.tween) {
			state.tween.kill();
			state.tween = null;
		}

		if (activeClassName) {
			element.classList.toggle(activeClassName, open);
		}

		state.hovered = false;
		state.leaveQueued = false;
		setUnderlineState(element, { open, origin, activeOpacity, inactiveOpacity });
	};

	const cleanup = () => {
		if (state.tween) {
			state.tween.kill();
			state.tween = null;
		}

		if (activeClassName) {
			element.classList.remove(activeClassName);
		}

		element.style.removeProperty('--underline-scale-x');
		element.style.removeProperty('--underline-opacity');
		element.style.removeProperty('--underline-origin-x');
	};

	return {
		cleanup,
		enter,
		leave,
		playIn,
		playOut,
		reset,
	};
}
