import { useEffect } from 'react';
import { gsap } from 'gsap';
import { viewport } from './helpers';

// owns app-wide non-route side effects such as shell state, listeners, and focus tracking
export default function useAppShellEffects({
	closeFooterTooltips,
	mainWrapper,
	mobileNavOpen,
	setMobileNavOpen,
	setScrollTop,
	setWindowSize,
	transitionBox,
	transitionText,
}) {
	// refs and state setters here are stable so mobileNavOpen is the real rerun trigger
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// mirrors the mobile nav open state onto the body and main wrapper for CSS-driven layout changes
		if (mobileNavOpen) {
			document.body.classList.add('mn-open');
			mainWrapper.current.classList.add('no-action');
		} else {
			document.body.classList.remove('mn-open');
			mainWrapper.current.classList.remove('no-action');
		}
		closeFooterTooltips();
	}, [closeFooterTooltips, mobileNavOpen]);

	// listener setup should stay stable and not be recreated because ref objects or setters are passed through
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// recalculates viewport-driven layout and transition element heights
		const resizeHandler = () => {
			setWindowSize(viewport());
			gsap.to([transitionBox.current, transitionText.current], {
				duration: 0.4,
				height: viewport().h,
			});

			// closes the mobile nav when the layout crosses back into desktop
			if (viewport().w > 640) {
				setMobileNavOpen(false);
			}
		};

		// keeps the shared scroll position state updated for other components
		const scrollHandler = () => {
			closeFooterTooltips();
			setScrollTop(window.scrollY);
		};

		// closes footer tooltips when clicking outside both tooltip panels and triggers
		const clickHandler = e => {
			const target = e.target;

			// guards against non-element event targets
			if (!(target instanceof Element)) {
				return;
			}

			if (!target.closest('.tooltip') && !target.closest('.tooltipTrigger')) {
				closeFooterTooltips();
			}
		};

		// runs the initial sync immediately before listeners are attached
		resizeHandler();
		scrollHandler();

		window.addEventListener('scroll', scrollHandler);
		window.addEventListener('resize', resizeHandler);
		window.addEventListener('click', clickHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
			window.removeEventListener('resize', resizeHandler);
			window.removeEventListener('click', clickHandler);
		};
	}, [closeFooterTooltips]);

	useEffect(() => {
		// tracks whether focus came from the mouse or keyboard so styles can respond accordingly
		let focusMethod = 'mouse';

		// removes the data attribute when focus fully leaves the document flow
		const clearFocusMethod = target => {
			if (target instanceof HTMLElement) {
				target.removeAttribute('data-focus-method');
			}
		};

		// ensures only the currently focused element carries the current focus method
		const setFocusMethod = target => {
			if (target instanceof HTMLElement) {
				const previous = document.querySelector('[data-focus-method]');
				if (previous && previous !== target) {
					previous.removeAttribute('data-focus-method');
				}
				target.setAttribute('data-focus-method', focusMethod);
			}
		};

		// marks future focus changes as mouse-driven
		const handleMouseDown = () => {
			focusMethod = 'mouse';
		};

		// marks future focus changes as keyboard-driven
		const handleKeyDown = () => {
			focusMethod = 'key';
		};

		// applies the focus-method attribute to the newly focused element
		const handleFocusIn = e => {
			setFocusMethod(e.target);
		};

		// removes the attribute when focus drops away entirely
		const handleFocusOut = e => {
			if (!e.relatedTarget) {
				clearFocusMethod(e.target);
			}
		};

		document.addEventListener('mousedown', handleMouseDown, true);
		document.addEventListener('keydown', handleKeyDown, true);
		document.addEventListener('focusin', handleFocusIn, true);
		document.addEventListener('focusout', handleFocusOut, true);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown, true);
			document.removeEventListener('keydown', handleKeyDown, true);
			document.removeEventListener('focusin', handleFocusIn, true);
			document.removeEventListener('focusout', handleFocusOut, true);
		};
	}, []);
}
