import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { viewport, getPosition, delayRedirect } from './utils/helpers';
import Header from './Header';
import { pageTransitionVariants } from './utils/variables';
import { projects } from './utils/projects';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function Home({
	pageTransInProgress,
	setPageTransInProgress,
	isInitialLoad,
	setIsInitialLoad,
	scrollTop,
	lastScrollTop,
	windowSize,
}) {
	gsap.registerPlugin(ScrollToPlugin);
	const location = useLocation();
	const navigate = useNavigate();
	const charRef = useRef([]);
	const subheading = useRef(null);
	const giantName = useRef(null);
	const scrollDownIcon = useRef(null);
	const scrollDownWrap = useRef(null);
	const homeHeadingWrapper = useRef(null);

	const projectsRevealed = useRef(0);

	useEffect(() => {
		if (!pageTransInProgress && homeHeadingWrapper.current) {
			const animatedHeadings = gsap.timeline({ delay: 0.8 });
			animatedHeadings.staggerFrom(
				charRef.current,
				1,
				{ ease: 'elastic.out(1, 0.4)', y: 25, rotationZ: 10, alpha: 0, clearProps: 'all' },
				0.05
			);
			animatedHeadings.from(subheading.current, 0.8, { alpha: 0, clearProps: 'all' }, '-=1.2');
		} else if (!isInitialLoad && homeHeadingWrapper.current) {
			const animatedHeadings = gsap.timeline({ delay: 0.2 });
			animatedHeadings.staggerTo(
				charRef.current,
				0.6,
				{ ease: 'power4.inOut', y: gsap.utils.wrap([-20, 20]), alpha: 0 },
				0.04
			);
			animatedHeadings.to(subheading.current, 0.8, { alpha: 0 }, '-=.8');
		}
	}, [pageTransInProgress]);

	useEffect(() => {
		if (scrollDownWrap.current && scrollDownIcon.current) {
			if (projectsRevealed.current === 0) {
				// Down arrow animation
				gsap.from(scrollDownIcon.current, 0.6, {
					ease: 'elastic.out(1, 0.6)',
					delay: 1.5,
					y: -25,
					alpha: 0,
					repeatDelay: 0.4,
					repeat: -1,
					yoyo: true,
				});
			} else {
				// fade out down arrow when at least one project has been revealed
				gsap.to(scrollDownWrap.current, 0.3, {
					alpha: 0,
					onComplete: () => {
						// remove arrow on complete
						if (scrollDownWrap.current) {
							scrollDownWrap.current.innerHTML = '';
						}
					},
				});
			}
		}
	}, [projectsRevealed.current]);

	useEffect(() => {
		if (homeHeadingWrapper.current && giantName.current && subheading.current) {
			const deltaY1 = Math.min(scrollTop / 10, 50);
			const deltaY2 = Math.min(scrollTop / 20, 25);
			const deltaA = Math.max(1 - scrollTop / 500, 0);
			gsap.to(giantName.current, 0.5, { y: deltaY1 });
			gsap.to(subheading.current, 0.5, { y: deltaY2 });
			gsap.to(homeHeadingWrapper.current, 0.5, { alpha: deltaA });
		}
	}, [scrollTop]);

	useEffect(() => {
		document.title = 'Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/') {
			navigate('/', { replace: true });
		}
	}, []);

	return (
		<>
			<main>
				<div className="home-intro">
					<div className="inner-wrapper">
						<div className="row">
							<div className="home-about" ref={homeHeadingWrapper}>
								<h1 className="giant-name" ref={giantName}>
									{'ian espanto'.split('').map((char, i) => (
										<span key={`titleChar_${i}`}>
											{char === ' ' || (
												<span className="char" ref={elem => (charRef.current[i] = elem)}>
													{char}
												</span>
											)}
											{char === ' ' && ' '}
										</span>
									))}
								</h1>
								<p ref={subheading}>Frontend Web Engineer</p>
							</div>
						</div>
						<div className="scroll-down" ref={scrollDownWrap}>
							<span ref={scrollDownIcon}></span>
						</div>
					</div>
				</div>
				<Projects
					scrollTop={scrollTop}
					windowSize={windowSize}
					projectsRevealed={projectsRevealed}
					pageTransInProgress={pageTransInProgress}
					setPageTransInProgress={setPageTransInProgress}
					navigate={navigate}
				/>
			</main>
		</>
	);
}

function Projects({
	scrollTop,
	windowSize,
	projectsRevealed,
	pageTransInProgress,
	setPageTransInProgress,
	navigate,
}) {
	return (
		<div className="work">
			<div className="inner-wrapper inner-wrapper--large">
				<div className="pl row wrap">
					{projects.map((project, i) => (
						<Project
							key={`project_${i}_${project.id}`}
							project={project}
							i={i}
							scrollTop={scrollTop}
							windowSize={windowSize}
							projectsRevealed={projectsRevealed}
							pageTransInProgress={pageTransInProgress}
							setPageTransInProgress={setPageTransInProgress}
							navigate={navigate}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function Project({
	project,
	i,
	scrollTop,
	windowSize,
	projectsRevealed,
	pageTransInProgress,
	setPageTransInProgress,
	navigate,
}) {
	const [animated, setAnimated] = useState(false);
	const pItem = useRef(null);
	const pImg = useRef(null);
	const pImgContainer = useRef(null);
	const pOverlays = useRef([]);
	const pCopy = useRef([]);
	const pTooltip = useRef(null);
	const pFooter = useRef(null);

	const angle = 7;
	const projectRemainer = i % 4;
	let imgWidth = 600;
	let imgHeight = 900;

	const isAbout = project.id === 'about';

	if ([1, 2].includes(projectRemainer)) {
		imgWidth = 750;
		imgHeight = 500;
	}

	const theme = { backgroundColor: project.color };

	useEffect(() => {
		const height = pItem.current.offsetHeight;
		const alpha = Math.min(height / 2, 400);
		const heightInView = viewport().h + scrollTop - getPosition(pItem.current).y;

		// project tile fade in animation
		if (heightInView > alpha && !animated && !pageTransInProgress) {
			setAnimated(true);
			projectsRevealed.current += 1;
			pItem.current.classList.add('in-view');

			let delay = viewport().w > 860 ? (i % 2 === 0 ? 0.2 : 0.4) : 0.2;
			const translateX = i % 2 === 0 ? -30 : 30;
			const scaleX = i % 4 === 0 || i % 4 === 3 ? 0.032 : 0.026;
			const tl = gsap.timeline({
				delay: delay,
			});

			tl.add('l');
			tl.from(pItem.current, 0.9, { x: translateX, y: 30, clearProps: 'all' }, 'l');
			tl.from(pOverlays.current, 0.3, { alpha: 0 }, 'l');
			tl.to(pOverlays.current, 0.3, { alpha: 0.5 }, 'l+=.3');
			tl.to(pOverlays.current, 0.3, { alpha: 1 }, 'l+=.6');
			tl.from(pImg.current, 1, { ease: 'power4.inOut', x: -15, alpha: 0, clearProps: 'all' }, 'l+=.9');
			tl.staggerTo(
				pOverlays.current,
				1,
				{ ease: 'power4.inOut', transformOrigin: '100% 0%', scaleX: 0 },
				0.05,
				'l+=.9'
			);

			if (project.id !== 'about') {
				tl.from(pCopy.current, 1, { ease: 'power4.inOut', alpha: 0, clearProps: 'all' }, 'l+=.9');
			}

			tl.eventCallback('onComplete', () => {
				if (pImgContainer.current) {
					pImgContainer.current.classList.remove('no-action');
				}
			});
		}
	}, [scrollTop, animated, windowSize, pageTransInProgress]);

	const pMouseEnterHandler = e => {
		if (viewport().w > 1024) {
			const offsetX = e.pageX - getPosition(pImgContainer.current).x;
			const offsetY = e.pageY - getPosition(pImgContainer.current).y;

			if (!isAbout) {
				pFooter.current.classList.add('active');
				gsap.set(pTooltip.current, { x: offsetX, y: offsetY + 40, z: 15, scale: 0.6 });
				gsap.to(pTooltip.current, 0.4, { alpha: 0.65 });
			}
		}
	};

	const pMouseMoveHandler = e => {
		if (viewport().w > 1024) {
			const offsetX = e.pageX - getPosition(pImgContainer.current).x;
			const offsetY = e.pageY - getPosition(pImgContainer.current).y;
			const height = pImgContainer.current.offsetHeight;
			const width = pImgContainer.current.offsetWidth;
			const tooltipX = offsetX < 0 ? 0 : offsetX > width ? width : offsetX;
			const tooltipY = offsetY < 0 ? 0 : offsetY > height ? height : offsetY;
			gsap.to(pImg.current, 0.4, {
				rotationY: ((offsetX / width) * 2 - 1) * angle,
				rotationX: (1 - (offsetY / height) * 2) * angle,
				transformOrigin: '50% 50%',
				alpha: 0.7,
			});

			if (!isAbout) {
				gsap.to(pTooltip.current, 0.6, {
					rotationY: ((offsetX / width) * 2 - 1) * angle,
					rotationX: (1 - (offsetY / height) * 2) * angle,
					rotationZ: 0,
					scale: 1,
					x: tooltipX - 30,
					y: tooltipY + 20,
				});
			}
		}
	};

	const pMouseLeaveHandler = e => {
		if (viewport().w > 1024) {
			if (!isAbout) {
				pFooter.current.classList.remove('active');
				gsap.to(pTooltip.current, 0.4, { alpha: 0, scale: 0.6 });
			}
			gsap.to(pImg.current, 0.4, { rotationX: 0, rotationY: 0, z: 0, alpha: 1, clearProps: 'all' });
		}
	};

	return (
		<>
			<div className="pl__i jello row align-center" ref={pItem}>
				{project.id === 'about' || (
					<div className="pl__inner">
						<a
							href={project.link}
							target="_blank"
							rel="noreferrer"
							className="pl__img threed no-action"
							ref={pImgContainer}
							onMouseEnter={e => pMouseEnterHandler(e)}
							onMouseMove={e => pMouseMoveHandler(e)}
							onMouseLeave={e => pMouseLeaveHandler(e)}>
							<img
								className="pl__tl no-action"
								src={project.img}
								width={imgWidth}
								height={imgHeight}
								alt={`${project.title} - Ian Espanto`}
								ref={pImg}
							/>
							<span className="pl__o" style={theme} ref={elm => (pOverlays.current[0] = elm)}></span>
							<div className="pl__tt no-action" ref={pTooltip}>
								<div className="pl__tw">
									<span>{project.tooltip}</span>
								</div>
							</div>
						</a>
						<div className="pl__footer threed" ref={pFooter}>
							<p className="pl__t heading">
								<span className="pl__copy" ref={elm => (pCopy.current[0] = elm)}>
									{project.title}
								</span>
								<span className="pl__u" style={theme}></span>
								<span
									className="pl__o"
									style={theme}
									ref={elm => (pOverlays.current[1] = elm)}></span>
							</p>
							<div className="pl__in responsive-text">
								<span className="pl__d">
									<span className="pl__copy" ref={elm => (pCopy.current[1] = elm)}>
										{project.description}
									</span>
									<span
										className="pl__o"
										style={theme}
										ref={elm => (pOverlays.current[2] = elm)}></span>
								</span>
								<span className="pl__fn show-landscape">
									<span className="pl__copy" ref={elm => (pCopy.current[2] = elm)}>
										{project.footnote}
									</span>
									<span
										className="pl__o"
										style={theme}
										ref={elm => (pOverlays.current[3] = elm)}></span>
								</span>
							</div>
						</div>
					</div>
				)}
				{project.id === 'about' && (
					<NavLink
						to="/about"
						className="pl__extra transition-link pl__img no-action threed"
						ref={pImgContainer}
						onMouseEnter={e => pMouseEnterHandler(e)}
						onMouseMove={e => pMouseMoveHandler(e)}
						onMouseLeave={e => pMouseLeaveHandler(e)}
						onClick={e => delayRedirect(e, '/about', navigate, setPageTransInProgress)}>
						<div className="pl__o" ref={elm => (pOverlays.current[0] = elm)}></div>
						<div className="extra-container pl__tl no-action" ref={pImg}>
							<div className="extra-link">
								<span>
									Everything you need to know about <strong>Ian</strong>
								</span>
							</div>
							<div className="extra-graphics">
								<span className="diagonal-line"></span>
								<span className="circle"></span>
							</div>
						</div>
					</NavLink>
				)}
			</div>
		</>
	);
}
