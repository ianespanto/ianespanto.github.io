import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
// import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { viewport } from './components/utils/helpers';

export default function App() {
	gsap.registerPlugin(ScrollToPlugin);

	const playIntroTransition = 1;

	const location = useLocation();
	const mainWrapper = useRef(null);
	const contentWrapper = useRef(null);
	const loadingName = useRef(null);
	const loadingNameOverlay = useRef(null);
	const loadingTitle = useRef(null);
	const transitionBox = useRef(null);
	const transitionText = useRef(null);
	const testBox = useRef(null);
	const loading = useRef(null);
	const transitionCharRef = useRef([]);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const [creditTooltipOpen, setCreditTooltipOpen] = useState(false);

	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [pageTransInProgress, setPageTransInProgress] = useState(true);
	const [entireAnimationCompleted, setEntireAnimationCompleted] = useState(false);

	// for scroll and resize handlers
	const [scrollTop, setScrollTop] = useState(0);
	const lastScrollTop = useRef(0);
	const [windowSize, setWindowSize] = useState(viewport());

	const [loadingPercentage, setLoadingPercentage] = useState(0);

	useEffect(() => {
		// play intro animation, simple or complex (home), if is initial load
		if (isInitialLoad) {
			document.body.classList.add('no-action');
			const tl = gsap.timeline({ delay: 0.2 });

			if (location.pathname === '/' && playIntroTransition) {
				// Intro animation on homepage
				const count = { percentage: 0 };
				const black = '#282828';
				const white = '#fff';

				tl.set(loadingTitle.current, { x: '-50%' })
					.to(transitionBox.current, 0.5, { ease: 'power4.inOut', backgroundColor: white })
					.to(loading.current, 0.4, { ease: 'power4.inOut', alpha: 1 })
					.from(loadingNameOverlay.current, 0.9, {
						ease: 'power4.inOut',
						scaleX: 0,
						transformOrigin: '0% 0%',
					})
					.set(loadingName.current, { color: black })
					.to(loadingNameOverlay.current, 0.9, {
						ease: 'power4.inOut',
						scaleX: 0,
						transformOrigin: '100% 0%',
					})
					.to(transitionBox.current, 0.5, { ease: 'power4.inOut', backgroundColor: black })
					.to(loading.current, 0.5, { color: white }, '-=.5')
					.to(loadingName.current, 0.9, { ease: 'power4.inOut', y: '-100%', alpha: 0 }, '-=.5')
					.from(loadingTitle.current, 0.9, { ease: 'power4.inOut', y: '100%', alpha: 0 }, '-=.9')
					.add(() => {
						setPageTransInProgress(false);
					})
					.to(loading.current, 1.5, {
						ease: 'power4.inOut',
						y: '-100%',
						scale: 0.5,
						rotationZ: 10,
						alpha: 0,
					})
					.to(transitionBox.current, 1.5 / 2, { ease: 'power4.in', y: '-50%', skewY: 7 }, '-=' + 1.5)
					.to(
						transitionBox.current,
						1.5 / 2,
						{ ease: 'power4.out', y: '-100%', skewY: 0 },
						'-=' + 1.5 / 2
					);

				// Animating page load percentage
				const animatedPercentage = gsap.timeline({ delay: 1 });
				animatedPercentage.to(count, 3.4, {
					percentage: '+=100',
					roundProps: 'percentage',
					onUpdate: () => {
						setLoadingPercentage(count.percentage);
					},
					ease: 'power2.inOut',
				});
			} else {
				// Initial page load animation for pages other than homepage
				tl.add(() => {
					setPageTransInProgress(false);
				});
				tl.to(transitionBox.current, 1.5, { y: '-100%', ease: 'power4.inOut' });
			}

			tl.eventCallback('onComplete', () => {
				document.body.classList.remove('no-action');
				setEntireAnimationCompleted(true);
				setIsInitialLoad(false);
			});
		}
	}, []);

	useEffect(() => {
		if (!isInitialLoad && pageTransInProgress && !mobileNavOpen) {
			// page transition box (between pages)
			document.body.classList.add('no-action');
			setEntireAnimationCompleted(false);
			const tl = gsap.timeline({ delay: 0.2 });
			tl.add('l');
			tl.set(transitionBox.current, { y: '100%' });
			tl.set(transitionText.current, { y: '100%', alpha: 0 });
			tl.set(transitionCharRef.current, { y: 0 });
			tl.to(transitionBox.current, 1.5, { y: 0, ease: 'power4.inOut' }, 'l');
			tl.to(transitionText.current, 1.4, { alpha: 1, y: 0, ease: 'power4.inOut' }, 'l+=.1');
			tl.staggerFrom(
				transitionCharRef.current,
				1.5,
				{ ease: 'power4.inOut', y: gsap.utils.wrap([-20, 20]), alpha: 0 },
				0.05,
				'l+=.3'
			);
			tl.add(() => {
				setPageTransInProgress(false);
				gsap.set(window, { scrollTo: 0 });
			}, 'l+=1.5');
			tl.to(transitionBox.current, 1.5, { y: '-100%', ease: 'power4.inOut' }, 'l+=1.5');
			tl.to(transitionText.current, 1.4, { y: '-100%', ease: 'power4.inOut' }, 'l+=1.6');
			tl.to(transitionText.current, 1, { alpha: 0, ease: 'power4.inOut' }, 'l+=1.6');

			tl.eventCallback('onComplete', () => {
				document.body.classList.remove('no-action');
				setEntireAnimationCompleted(true);
			});
		}

		// page fade in/out animation
		if (pageTransInProgress && !mobileNavOpen) {
			const tl = gsap.timeline({ delay: 0.2 });
			tl.set(contentWrapper.current, { clearProps: 'all' });
			tl.to(contentWrapper.current, 1.5, { y: -200, alpha: 0, ease: 'power4.inOut' }, 'l');
		} else if (!pageTransInProgress) {
			const tl = gsap.timeline();
			tl.set(contentWrapper.current, { y: 200, alpha: 0 });
			tl.to(contentWrapper.current, 1.5, { y: 0, alpha: 1, ease: 'power4.inOut' });
		}

		setCreditTooltipOpen(false);
	}, [pageTransInProgress]);

	useEffect(() => {
		// ignore scroll if it's too negligible
		if (Math.abs(lastScrollTop.current - scrollTop) > 5) {
			lastScrollTop.current = scrollTop;
		}
	}, [scrollTop]);

	useEffect(() => {
		if (mobileNavOpen) {
			document.body.classList.add('mn-open');
			mainWrapper.current.classList.add('no-action');
		} else {
			document.body.classList.remove('mn-open');
			mainWrapper.current.classList.remove('no-action');
		}
		setCreditTooltipOpen(false);
	}, [mobileNavOpen]);

	useEffect(() => {
		const resizeHandler = () => {
			setWindowSize(viewport());
			gsap.set([transitionBox.current, transitionText.current], {
				height: viewport().h,
			});
			if (viewport().w > 640) {
				setMobileNavOpen(false);
			}
		};

		const scrollHandler = () => {
			setScrollTop(window.scrollY);
		};

		const clickHandler = e => {
			if (!e.target.classList.contains('credits-trigger')) {
				setCreditTooltipOpen(false);
			}
		};

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
	}, []);

	return (
		<>
			<MobileNav
				pageTransInProgress={pageTransInProgress}
				setPageTransInProgress={setPageTransInProgress}
				mobileNavOpen={mobileNavOpen}
				setMobileNavOpen={setMobileNavOpen}
				creditTooltipOpen={creditTooltipOpen}
				setCreditTooltipOpen={setCreditTooltipOpen}
			/>
			<div className="wrapper" ref={mainWrapper}>
				<Header
					pageTransInProgress={pageTransInProgress}
					setPageTransInProgress={setPageTransInProgress}
					scrollTop={scrollTop}
					lastScrollTop={lastScrollTop}
					mobileNavOpen={mobileNavOpen}
					setMobileNavOpen={setMobileNavOpen}
					entireAnimationCompleted={entireAnimationCompleted}
					windowSize={windowSize}
				/>
				<div ref={contentWrapper}>
					<Routes>
						<Route
							path="/"
							element={
								<Home
									pageTransInProgress={pageTransInProgress}
									setPageTransInProgress={setPageTransInProgress}
									isInitialLoad={isInitialLoad}
									setIsInitialLoad={setIsInitialLoad}
									scrollTop={scrollTop}
									lastScrollTop={lastScrollTop}
									windowSize={windowSize}
								/>
							}
						/>
						<Route
							path="/about"
							element={
								<About
									pageTransInProgress={pageTransInProgress}
									setPageTransInProgress={setPageTransInProgress}
									isInitialLoad={isInitialLoad}
									setIsInitialLoad={setIsInitialLoad}
									scrollTop={scrollTop}
									lastScrollTop={lastScrollTop}
									windowSize={windowSize}
								/>
							}
						/>
						<Route path="/contact" element={<Contact />} />
						<Route path="/*" element={<NotFound pageTransInProgress={pageTransInProgress} />} />
					</Routes>
					<footer className="show-medium main-footer footer">
						<Footer
							isMobileNav={false}
							creditTooltipOpen={creditTooltipOpen}
							setCreditTooltipOpen={setCreditTooltipOpen}
						/>
					</footer>
				</div>
			</div>
			<div className="transitionBox" ref={transitionBox}></div>
			<div className="loading row align-center no-action" ref={loading}>
				<div className="loading-container column align-center">
					<div className="loading-hero-copy">
						<span className="loading-name" ref={loadingName}>
							<span>ian espanto</span>
							<span className="loading-name-overlay" ref={loadingNameOverlay}></span>
						</span>
						<span className="loading-title" ref={loadingTitle}>
							interactive developer
						</span>
					</div>
					<div>
						<span className="loading-percentage">{loadingPercentage}</span>%
					</div>
				</div>
			</div>
			<div className="transitionText no-action threed" ref={transitionText}>
				<span>
					{'ian espanto'.split('').map((char, i) => (
						<span key={`transitionTextChar_${i}`}>
							{char === ' ' || (
								<span className="char" ref={elem => (transitionCharRef.current[i] = elem)}>
									{char}
								</span>
							)}
							{char === ' ' && ' '}
						</span>
					))}
				</span>
			</div>
		</>
	);
}
