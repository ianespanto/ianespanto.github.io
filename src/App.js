import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';
import useAppLanguage from './components/utils/useAppLanguage';
import useAppShellEffects from './components/utils/useAppShellEffects';
import useAppTransitions from './components/utils/useAppTransitions';
import useLinkHoverAnimations from './components/utils/useLinkHoverAnimations';

export default function App() {
	gsap.registerPlugin(ScrollToPlugin);
	const { t, i18n } = useTranslation();

	const location = useLocation();
	const navigate = useNavigate();
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
	const [activeFooterTooltip, setActiveFooterTooltip] = useState(null);

	// for scroll and resize handlers
	const [scrollTop, setScrollTop] = useState(0);
	const lastScrollTop = useRef(0);
	const [windowSize, setWindowSize] = useState(viewport());

	// centralizes footer tooltip closing so multiple app-level hooks can reuse it
	const closeFooterTooltips = useCallback(() => {
		setActiveFooterTooltip(null);
	}, []);

	// handles language state, URL syncing, and i18n updates
	const { lang, handleLangChange } = useAppLanguage({ i18n, location, navigate });

	// handles first-load and route-transition animation state
	const { entireAnimationCompleted, isInitialLoad, loadingPercentage, pageTransInProgress, setPageTransInProgress } =
		useAppTransitions({
			closeFooterTooltips,
			locationPathname: location.pathname,
			mobileNavOpen,
			refs: {
				contentWrapper,
				loading,
				loadingName,
				loadingNameOverlay,
				loadingTitle,
				transitionBox,
				transitionCharRef,
				transitionText,
			},
		});

	useEffect(() => {
		// only updates the remembered scroll position when the movement is meaningful enough to matter
		if (Math.abs(lastScrollTop.current - scrollTop) > 5) {
			lastScrollTop.current = scrollTop;
		}
	}, [scrollTop]);

	// handles app-wide shell effects like resize, outside clicks, and focus-method tracking
	useAppShellEffects({
		closeFooterTooltips,
		mainWrapper,
		mobileNavOpen,
		setMobileNavOpen,
		setScrollTop,
		setWindowSize,
		transitionBox,
		transitionText,
	});
	useLinkHoverAnimations();

	return (
		<>
			<MobileNav
				setPageTransInProgress={setPageTransInProgress}
				mobileNavOpen={mobileNavOpen}
				setMobileNavOpen={setMobileNavOpen}
				activeFooterTooltip={activeFooterTooltip}
				setActiveFooterTooltip={setActiveFooterTooltip}
				windowSize={windowSize}
				lang={lang}
				setLang={handleLangChange}
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
						<Route
							path="/*"
							element={
								<NotFound
									pageTransInProgress={pageTransInProgress}
									setPageTransInProgress={setPageTransInProgress}
								/>
							}
						/>
					</Routes>
					<footer className="show-medium main-footer footer">
						<Footer
							isMobileNav={false}
							activeTooltip={activeFooterTooltip}
							setActiveTooltip={setActiveFooterTooltip}
							lang={lang}
							setLang={handleLangChange}
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
