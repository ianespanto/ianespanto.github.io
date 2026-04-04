import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// resolves a CSS custom property to a concrete runtime color value for GSAP
const getCssColor = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// owns the first-load intro, between-page transitions, and shared content fade animations
export default function useAppTransitions({ closeFooterTooltips, locationPathname, mobileNavOpen, refs }) {
	const introSessionKey = 'folio_intro_played';
	const playIntroTransition = false;
	// prevents the generic content reveal from running on the first post-load render
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [pageTransInProgress, setPageTransInProgress] = useState(true);
	const [entireAnimationCompleted, setEntireAnimationCompleted] = useState(false);
	const [loadingPercentage, setLoadingPercentage] = useState(0);
	const {
		contentWrapper,
		loading,
		loadingName,
		loadingNameOverlay,
		loadingTitle,
		transitionBox,
		transitionCharRef,
		transitionText,
	} = refs;

	// animation refs are stable so this effect should only rerun for the actual intro state/path changes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// only the first render cycle is allowed to run the intro path
		if (!isInitialLoad) {
			return;
		}

		document.body.classList.add('no-action');
		const tl = gsap.timeline({ delay: 0.2 });
		const black = getCssColor('--color-black');
		const white = getCssColor('--color-white');
		const hasPlayedIntroInSession = sessionStorage.getItem(introSessionKey) === 'true';
		// the full homepage intro only plays on / and only once per session unless the dev override is enabled
		const shouldPlayIntroAnimation =
			locationPathname === '/' &&
			(playIntroTransition || (process.env.NODE_ENV === 'production' && !hasPlayedIntroInSession));

		if (shouldPlayIntroAnimation) {
			// records that the full homepage intro has already run in this browser session
			sessionStorage.setItem(introSessionKey, 'true');

			// drives the animated fake loading percentage during the homepage intro
			const count = { percentage: 0 };

			tl.set(loadingTitle.current, { x: '-50%', color: white });
			tl.set(loading.current, { color: black });
			tl.set(loadingNameOverlay.current, { backgroundColor: black });
			tl.to(transitionBox.current, { duration: 0.5, ease: 'power4.inOut', backgroundColor: white });
			tl.to(loading.current, { duration: 0.4, ease: 'power4.inOut', alpha: 1 });
			tl.from(loadingNameOverlay.current, {
				duration: 0.9,
				ease: 'power4.inOut',
				scaleX: 0,
				transformOrigin: '0% 0%',
			});
			tl.set(loadingName.current, { color: black });
			tl.to(loadingNameOverlay.current, {
				duration: 0.9,
				ease: 'power4.inOut',
				scaleX: 0,
				transformOrigin: '100% 0%',
			});
			tl.to(transitionBox.current, { duration: 0.5, ease: 'power4.inOut', backgroundColor: black });
			tl.to(loading.current, { duration: 0.5, color: white }, '-=.5');
			tl.to(loadingName.current, { duration: 0.9, ease: 'power4.inOut', y: '-100%', alpha: 0 }, '-=.5');
			tl.from(loadingTitle.current, { duration: 0.9, ease: 'power4.inOut', y: '100%', alpha: 0 }, '-=.9');
			tl.add(() => {
				setPageTransInProgress(false);
			});
			tl.to(loading.current, {
				duration: 1.5,
				ease: 'power4.inOut',
				y: '-100%',
				scale: 0.5,
				rotationZ: 10,
				alpha: 0,
			});
			tl.to(transitionBox.current, { duration: 1.5 / 2, ease: 'power4.in', y: '-50%', skewY: 7 }, '-=' + 1.5);
			tl.to(
				transitionBox.current,
				{ duration: 1.5 / 2, ease: 'power4.out', y: '-100%', skewY: 0 },
				'-=' + 1.5 / 2,
			);

			const animatedPercentage = gsap.timeline({ delay: 1 });
			animatedPercentage.to(count, {
				duration: 3.4,
				percentage: '+=100',
				roundProps: 'percentage',
				onUpdate: () => {
					setLoadingPercentage(count.percentage);
				},
				ease: 'power2.inOut',
			});
		} else {
			// uses the simpler first-load reveal for non-home routes or when the intro has already run
			tl.add(() => {
				setPageTransInProgress(false);
			});
			tl.to(transitionBox.current, { duration: 0.2, backgroundColor: black });
			tl.to(transitionBox.current, { duration: 1.5, y: '-100%', ease: 'power4.inOut' }, '-=.2');
		}

		tl.eventCallback('onComplete', () => {
			document.body.classList.remove('no-action');
			setEntireAnimationCompleted(true);
			setIsInitialLoad(false);
		});
	}, [isInitialLoad, locationPathname]);

	// animation refs are stable so this effect should only rerun for real transition state changes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// runs the full between-page transition only after the initial load has completed
		if (!isInitialLoad && pageTransInProgress && !mobileNavOpen) {
			closeFooterTooltips();
			document.body.classList.add('no-action');
			setEntireAnimationCompleted(false);
			const tl = gsap.timeline({ delay: 0.2 });
			tl.add('l');
			tl.set(transitionBox.current, { y: '100%' });
			tl.set(transitionText.current, { y: '100%', alpha: 0 });
			tl.set(transitionCharRef.current, { y: 0 });
			tl.to(transitionBox.current, { duration: 1.5, y: 0, ease: 'power4.inOut' }, 'l');
			tl.to(transitionText.current, { duration: 1.4, alpha: 1, y: 0, ease: 'power4.inOut' }, 'l+=.1');
			tl.from(
				transitionCharRef.current,
				{
					duration: 0.6,
					ease: 'power4.inOut',
					y: gsap.utils.wrap([-30, 30]),
					alpha: 0,
					stagger: 0.04,
				},
				'l+=.8',
			);
			tl.add(() => {
				setPageTransInProgress(false);
				gsap.set(window, { scrollTo: 0 });
			}, 'l+=1.5');
			tl.to(transitionBox.current, { duration: 1.5, y: '-100%', ease: 'power4.inOut' }, 'l+=1.5');
			tl.to(transitionText.current, { duration: 1.3, y: '-100%', ease: 'power4.inOut' }, 'l+=1.7');
			tl.to(transitionText.current, { duration: 1, alpha: 0, ease: 'power4.inOut' }, 'l+=1.7');

			tl.eventCallback('onComplete', () => {
				document.body.classList.remove('no-action');
				setEntireAnimationCompleted(true);
			});
		}

		// fades page content out during route changes and back in after the transition completes
		if (pageTransInProgress && !mobileNavOpen) {
			closeFooterTooltips();
			const tl = gsap.timeline({ delay: 0.2 });
			tl.set(contentWrapper.current, { clearProps: 'all' });
			tl.to(contentWrapper.current, { duration: 1.5, y: -200, alpha: 0, ease: 'power4.inOut' }, 'l');
		} else if (!pageTransInProgress) {
			const tl = gsap.timeline();
			tl.set(contentWrapper.current, { y: 200, alpha: 0 });
			tl.to(contentWrapper.current, { duration: 1.5, y: 0, alpha: 1, ease: 'power4.inOut' });
		}
	}, [pageTransInProgress]);

	return {
		entireAnimationCompleted,
		isInitialLoad,
		loadingPercentage,
		pageTransInProgress,
		setPageTransInProgress,
	};
}
