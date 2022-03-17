import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import bioImgDesktop from '../assets/img/bio/d.jpg';
import bioImgMobile from '../assets/img/bio/m.jpg';
import { gsap } from 'gsap';
import Flickity from 'flickity';
import { pageTransitionVariants, skillLists, jobList, schoolList } from './utils/variables';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { delayRedirect, getPosition } from './utils/helpers';

export default function About({
	pageTransInProgress,
	setPageTransInProgress,
	scrollTop,
	lastScrollTop,
	windowSize,
	entireAnimationCompleted,
}) {
	gsap.registerPlugin(ScrollToPlugin);

	const navigate = useNavigate();
	const location = useLocation();

	const sections = useRef([]);

	useEffect(() => {
		if (sections?.current?.length > 0) {
			sections.current.forEach((section, i) => {
				const height = section.offsetHeight;
				const alpha = Math.min(height / 2, windowSize > 1024 ? 400 : 150);
				const heightInView = windowSize.h + scrollTop - getPosition(section).y;

				if (
					heightInView > alpha &&
					!section.classList.contains('in-view') &&
					!pageTransInProgress &&
					entireAnimationCompleted
				) {
					section.classList.add('in-view');

					gsap.from(section, {
						delay: 0.2,
						duration: 1,
						ease: 'power2.out',
						y: 50,
						alpha: 0,
						clearProps: 'all',
					});
				}
			});
		}
	}, [windowSize, scrollTop, pageTransInProgress, entireAnimationCompleted]);

	useEffect(() => {
		document.title = 'About · Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/about') {
			navigate('/about', { replace: true });
		}
	}, []);

	return (
		<>
			<main className="about">
				<h1 className="hidden">About</h1>
				<Bio />

				{/* Technical Expertise */}
				<div className="about-section jello" ref={elm => (sections.current[0] = elm)}>
					<div className="inner-wrapper">
						<div className="about-heading">
							<span>Technical Expertise</span>
						</div>
						<SkillList isDesktopVers={true} />
						<SkillList isDesktopVers={false} />
					</div>
				</div>

				{/* Work Experience */}
				<div className="about-section jello" ref={elm => (sections.current[1] = elm)}>
					<div className="inner-wrapper">
						<div className="about-heading">
							<span>Work Experience</span>
						</div>
						<div className="responsive-row responsive-row--landscape about-content jl">
							{jobList.map(({ company, role, time, description, footnote }, i) => (
								<div key={`job_${i}`} className="jl__i jello-child">
									<p className="job-company heading">{company}</p>
									<p className="job-info job-role">{role}</p>
									<p className="job-info job-time">{time}</p>
									<p>{description}</p>
									{footnote && <p className="footnote">* {footnote}</p>}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Education */}
				<div className="about-section jello" ref={elm => (sections.current[2] = elm)}>
					<div className="inner-wrapper">
						<div className="about-heading">
							<span>Education</span>
						</div>
						<div className="about-content">
							<div className="el">
								{schoolList.map(({ name, short, degree, degree_short, grad }, i) => (
									<div key={`school_${i}`} className="el__i jello-child">
										<div>
											<p className="heading school-name">
												<span className="show-medium">{name}</span>
												<span className="hide-medium">{short}</span>
											</p>
											<p>
												<span className="show-small">{degree}</span>
												<span className="hide-small">{degree_short ? degree_short : degree}</span>
											</p>
											<p>
												<span>{grad}</span>
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Closing */}
				<div className="about-section jello profile-section" ref={elm => (sections.current[3] = elm)}>
					<div className="inner-wrapper">
						<div className="about-content">
							<p className="jello-child">
								As a critical thinker with sharp attention for detail, I strive to make the most out
								of a project by focusing on both the functional and aesthetic aspects of web
								development. My aim to achieve this balance fuels my desire to produce quality
								websites and web applications that are not only visually pleasing and fresh, but also
								innovative, interactive, and user-friendly. I'm always on the lookout for interesting
								projects with awesome people. Need a hand?{' '}
								<Link
									className="link-hover transition-link"
									to="/contact"
									onClick={e => delayRedirect(e, '/contact', navigate, setPageTransInProgress)}>
									Drop me a line
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function Bio() {
	const bioSection = useRef(null);
	const bioImgWrap = useRef(null);
	const bioImgOverlay = useRef(null);
	const bioImgs = useRef([]);
	const bioCopy = useRef([]);

	useEffect(() => {
		if (bioSection.current) {
			const bioTl = gsap.timeline({ delay: 0.2 });
			bioTl.add('l');
			bioTl.from(bioImgOverlay.current, { duration: 0.3, alpha: 0 });
			bioTl.to(bioImgOverlay.current, { duration: 0.3, alpha: 0.5 });
			bioTl.to(bioImgOverlay.current, { duration: 0.3, alpha: 1 });
			bioTl.from(bioImgs.current, {
				duration: 1,
				ease: 'power4.inOut',
				x: -15,
				alpha: 0,
				clearProps: 'all',
			});
			bioTl.to(
				bioImgOverlay.current,
				{ duration: 1, ease: 'power4.inOut', transformOrigin: '100% 0%', scaleX: 0 },
				'-=1'
			);
			bioTl.from(
				bioCopy.current,
				{ duration: 1, ease: 'power2.out', y: 50, alpha: 0, clearProps: 'all', stagger: 0.2 },
				'l+=.8'
			);
		}
	}, []);

	return (
		<div className="about-section" ref={bioSection}>
			<div className="inner-wrapper">
				<div className="about-heading">
					<span>Me in a Nutshell</span>
				</div>
				<div className="responsive-row responsive-row--landscape about-content align-center">
					<div className="bio-img" ref={bioImgWrap}>
						<img
							className="hide-landscape"
							width="1088"
							height="816"
							src={bioImgMobile}
							alt="Ian Espanto"
							ref={elm => (bioImgs.current[0] = elm)}
						/>
						<img
							className="show-landscape"
							width="600"
							height="800"
							src={bioImgDesktop}
							alt="Ian Espanto"
							ref={elm => (bioImgs.current[1] = elm)}
						/>
						<div className="bio-img__overlay" ref={bioImgOverlay}></div>
					</div>
					<div className="bio-t">
						<p ref={elm => (bioCopy.current[0] = elm)}>
							Hello world! I'm Ian, a meticulous frontend web engineer based in British Columbia
							specializing in the development and maintenance of custom content management systems,
							modern websites and web applications dynamically built with JavaScript frameworks such as
							React using the latest tools and technologies.
						</p>
						<p ref={elm => (bioCopy.current[1] = elm)}>
							Having always had a strong interest in programming, design and numbers, I graduated from
							UBC, one of the Top 3 universities in Canada with a Bachelor of Science in{' '}
							<a className="link-hover" href="https://www.cs.ubc.ca/" target="_blank" rel="noreferrer">
								computer science
							</a>{' '}
							and{' '}
							<a
								className="link-hover"
								href="https://www.stat.ubc.ca/"
								target="_blank"
								rel="noreferrer">
								statistics
							</a>{' '}
							in 2015, after which I attended BCIT's School of Computing to study{' '}
							<a
								className="link-hover"
								href="https://www.bcit.ca/programs/front-end-web-developer-certificate-full-time-6535cert/"
								target="_blank"
								rel="noreferrer">
								frontend development
							</a>{' '}
							and finished the program top of the class. Since then, I have worked on a breadth of
							projects with a wide range of clients, coded dozens of websites in various formats, and
							developed multiple applications integrating data fetched from APIs.
						</p>
						<p ref={elm => (bioCopy.current[2] = elm)}>
							Although I am a programmer by definition, I am also proficient in rastor graphics editing
							using Photoshop and have been heavily involved in the design process throughout my
							career. I am a pianist and a{' '}
							<a
								className="link-hover"
								href="https://soundcloud.com/ianespanto"
								target="_blank"
								rel="noreferrer">
								hobbyist composer
							</a>{' '}
							in my spare time.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function SkillList({ isDesktopVers }) {
	const skillListRef = useRef(null);

	const className =
		'about-content sl ' +
		(isDesktopVers ? 'row space-around sl--list show-portrait' : 'sl--carousel hide-portrait');

	useEffect(() => {
		if (skillListRef.current && !isDesktopVers) {
			const flkty = new Flickity(skillListRef.current, { cellAlign: 'center', prevNextButtons: false });
		}
	}, [skillListRef]);

	return (
		<div className={className} ref={skillListRef}>
			{skillLists.map(({ title, icon, icon_paths, list }, i) => {
				const colorIcon = [];

				for (let pathIndex = 1; pathIndex <= icon_paths; pathIndex++) {
					colorIcon.push(
						<span key={`skillListIconPath_${i}_${pathIndex}`} className={`path${pathIndex}`}></span>
					);
				}

				return (
					<div
						key={`skillList_${i}_${isDesktopVers ? 'list' : 'carousel'}`}
						className={`sl__i${isDesktopVers ? ' jello-child' : ''}`}>
						<div className="sl-icon">
							<span className={`mono-icon i-${icon}`}></span>
							<span className={`color-icon i-${icon}-c`}>{colorIcon}</span>
						</div>
						<p className="heading skill-heading">{title}</p>
						<ul className="responsive-text">
							{list.map((listItem, listItemIndex) => (
								<li key={`skillListItem_${i}_${listItemIndex}`}>
									<span>{listItem}</span>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
