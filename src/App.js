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
import { langList } from './components/utils/variables';
import { useTranslation } from 'react-i18next';

export default function App() {
	gsap.registerPlugin(ScrollToPlugin);
	const { t, i18n } = useTranslation();

	const playIntroTransition = 0;

	// try getting user's preferred language from localStorage
	const [lang, setLang] = useState(
		localStorage.lang && langList.find(l => l.id === localStorage.lang) ? localStorage.lang : 'en'
	);

	const location = useLocation();
	const mainWrapper = useRef(null);
	const contentWrapper = useRef(null);
	const loadingName = useRef(null);
	const loadingNameOverlay = useRef(null);
	const loadingTitle = useRef(null);
	const transitionBox = useRef(null);
	const transitionText = useRef(null);
	const loading = useRef(null);
	const transitionCharRef = useRef([]);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const [creditTooltipOpen, setCreditTooltipOpen] = useState(false);
	const [langTooltipOpen, setLangTooltipOpen] = useState(false);

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
			const black = '#282828';
			const white = '#fff';

			if (location.pathname === '/' && (playIntroTransition || process.env.NODE_ENV === 'production')) {
				// Intro animation on homepage
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
					'-=' + 1.5 / 2
				);

				// Animating page load percentage
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
				// Initial page load animation for pages other than homepage
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
				'l+=.8'
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

		// page fade in/out animation
		if (pageTransInProgress && !mobileNavOpen) {
			const tl = gsap.timeline({ delay: 0.2 });
			tl.set(contentWrapper.current, { clearProps: 'all' });
			tl.to(contentWrapper.current, { duration: 1.5, y: -200, alpha: 0, ease: 'power4.inOut' }, 'l');
		} else if (!pageTransInProgress) {
			const tl = gsap.timeline();
			tl.set(contentWrapper.current, { y: 200, alpha: 0 });
			tl.to(contentWrapper.current, { duration: 1.5, y: 0, alpha: 1, ease: 'power4.inOut' });
		}

		setCreditTooltipOpen(false);
		setLangTooltipOpen(false);
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
		setLangTooltipOpen(false);
	}, [mobileNavOpen]);

	// when language is changed, update it in localStorage
	useEffect(() => {
		if (langList.find(l => l.id === lang)) {
			i18n.changeLanguage(lang);
			localStorage.setItem('lang', lang);
			document.documentElement.lang = lang;

			// document.body.classList.add(lang);
			// langList.forEach(({ id }) => {
			// 	if (id !== lang) {
			// 		if (document.body.classList.contains(id)) {
			// 			document.body.classList.remove(id);
			// 		}
			// 	}
			// });
		}
	}, [lang]);

	useEffect(() => {
		const resizeHandler = () => {
			setWindowSize(viewport());
			gsap.to([transitionBox.current, transitionText.current], {
				duration: 0.4,
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
			if (!e.target.classList.contains('lang-trigger')) {
				setLangTooltipOpen(false);
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
				setPageTransInProgress={setPageTransInProgress}
				mobileNavOpen={mobileNavOpen}
				setMobileNavOpen={setMobileNavOpen}
				creditTooltipOpen={creditTooltipOpen}
				setCreditTooltipOpen={setCreditTooltipOpen}
				windowSize={windowSize}
				langTooltipOpen={langTooltipOpen}
				setLangTooltipOpen={setLangTooltipOpen}
				lang={lang}
				setLang={setLang}
			/>
			<div className="wrapper" ref={mainWrapper}>
				<Header
					pageTransInProgress={pageTransInProgress}
					setPageTransInProgress={setPageTransInProgress}
					scrollTop={scrollTop}
					lastScrollTop={lastScrollTop}
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
									scrollTop={scrollTop}
									windowSize={windowSize}
									entireAnimationCompleted={entireAnimationCompleted}
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
							langTooltipOpen={langTooltipOpen}
							setLangTooltipOpen={setLangTooltipOpen}
							lang={lang}
							setLang={setLang}
						/>
					</footer>
				</div>
			</div>

			{/* full screen black box */}
			<div className="transitionBox" ref={transitionBox}></div>

			{/* animated text during initial load */}
			{isInitialLoad && (
				<div className="loading row align-center no-action" ref={loading}>
					<div className="loading-container column align-center">
						<div className="loading-hero-copy">
							<span className="loading-name" ref={loadingName}>
								<span>ian espanto</span>
								<span className="loading-name-overlay" ref={loadingNameOverlay}></span>
							</span>
							<span className="loading-title" ref={loadingTitle}>
								{t('frontend_engineer')}
							</span>
						</div>
						<div>
							<span className="loading-percentage">{loadingPercentage}</span>%
						</div>
					</div>
				</div>
			)}

			{/* transiiton text */}
			<div className="transitionText no-action" ref={transitionText}>
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
