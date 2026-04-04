import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createQueuedUnderlineController } from './underlineAnimations';

export default function useLinkHoverAnimations() {
	const location = useLocation();

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
		const linkControllers = new WeakMap();

		const enableHoverAnimations = () => {
			document.querySelectorAll('.link-hover').forEach(element => {
				const controller = createQueuedUnderlineController({
					element,
					activeClassName: 'is-link-hover-active',
				});
				const onEnter = () => controller.enter();
				const onLeave = () => controller.leave();

				controller.reset();
				linkControllers.set(element, { controller, onEnter, onLeave });
				element.addEventListener('mouseenter', onEnter);
				element.addEventListener('mouseleave', onLeave);

				if (element.matches(':hover')) {
					controller.enter();
				}
			});
		};

		const disableHoverAnimations = () => {
			document.querySelectorAll('.link-hover').forEach(element => {
				const state = linkControllers.get(element);

				if (state?.onEnter) {
					element.removeEventListener('mouseenter', state.onEnter);
				}

				if (state?.onLeave) {
					element.removeEventListener('mouseleave', state.onLeave);
				}

				state?.controller?.cleanup();
				linkControllers.delete(element);
			});
		};

		const syncHoverAnimations = () => {
			disableHoverAnimations();

			if (mediaQuery.matches) {
				enableHoverAnimations();
			}
		};

		syncHoverAnimations();
		mediaQuery.addEventListener('change', syncHoverAnimations);

		return () => {
			mediaQuery.removeEventListener('change', syncHoverAnimations);
			disableHoverAnimations();
		};
	}, [location.pathname]);
}
