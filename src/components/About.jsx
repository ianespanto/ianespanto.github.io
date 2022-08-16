import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import bioImgDesktop from '../assets/img/bio/d.jpg';
import bioImgMobile from '../assets/img/bio/m.jpg';
import { gsap } from 'gsap';
import Flickity from 'flickity';
import { jobList, schoolList } from './utils/variables';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { delayRedirect, getPosition } from './utils/helpers';
import { useTranslation } from 'react-i18next';

export default function About({
	pageTransInProgress,
	setPageTransInProgress,
	scrollTop,
	windowSize,
	entireAnimationCompleted,
}) {
	gsap.registerPlugin(ScrollToPlugin);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const location = useLocation();

	const sections = useRef([]);
	const [inViewSections, setInViewSections] = useState(0);

	useEffect(() => {
		if (sections?.current?.length > 0) {
			sections.current.forEach((section, i) => {
				const height = section.offsetHeight;
				const alpha = Math.min(height / 2, windowSize > 1024 ? 600 : 150);
				const heightInView = windowSize.h + scrollTop - getPosition(section).y;

				if (
					heightInView > alpha &&
					inViewSections <= i &&
					!pageTransInProgress &&
					entireAnimationCompleted
				) {
					section.classList.add('in-view');
					setInViewSections(old => (old += 1));

					gsap.from(section, {
						delay: 0.2,
						duration: 1,
						ease: 'power3.out',
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
							<span>{t('about_headings.skills')}</span>
						</div>
						<SkillList isDesktopVers={true} />
						<SkillList isDesktopVers={false} />
					</div>
				</div>

				{/* Work Experience */}
				<div className="about-section jello" ref={elm => (sections.current[1] = elm)}>
					<div className="inner-wrapper">
						<div className="about-heading">
							<span>{t('about_headings.experience')}</span>
						</div>
						<div className="responsive-row responsive-row--landscape about-content jl">
							{jobList.map(({ id }, i) => (
								<div key={`job_${i}`} className="jl__i jello-child">
									<p className="job-company heading">{t(`jobs.${id}.company`)}</p>
									<p className="job-info job-role">{t(`jobs.${id}.role`)}</p>
									<p className="job-info job-time">{t(`jobs.${id}.time`)}</p>
									<p className="job-description">{t(`jobs.${id}.description`)}</p>
									{t(`jobs.${id}.footnote`) && (
										<p className="footnote">* {t(`jobs.${id}.footnote`)}</p>
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Education */}
				<div className="about-section jello" ref={elm => (sections.current[2] = elm)}>
					<div className="inner-wrapper">
						<div className="about-heading">
							<span>{t('about_headings.education')}</span>
						</div>
						<div className="about-content">
							<div className="el">
								{schoolList.map(({ id }, i) => (
									<div key={`school_${i}`} className="el__i jello-child">
										<div>
											<p className="heading school-name">
												<span className="show-medium">{t(`education.${id}.name`)}</span>
												<span className="hide-medium">{t(`education.${id}.short`)}</span>
											</p>
											<p>
												<span className="show-small">{t(`education.${id}.degree`)}</span>
												<span className="hide-small">
													{t(`education.${id}.degree_short`)
														? t(`education.${id}.degree_short`)
														: t(`education.${id}.degree`)}
												</span>
											</p>
											<p>
												<span>{t(`education.${id}.grad`)}</span>
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
								{t('bio_closing.part1')}
								<Link
									className="link-hover transition-link"
									to="/contact"
									onClick={e => delayRedirect(e, '/contact', navigate, setPageTransInProgress)}>
									{t('bio_closing.contact_me')}
								</Link>
								{t('bio_closing.part2')}
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function Bio() {
	const { t } = useTranslation();
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
				scale: 1.05,
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
				{ duration: 1, ease: 'power3.out', y: 100, alpha: 0, clearProps: 'all', stagger: 0.11 },
				'l+=.8'
			);
		}
	}, []);

	return (
		<div className="about-section in-view" ref={bioSection}>
			<div className="inner-wrapper">
				<div className="about-heading">
					<span>{t('about_headings.bio')}</span>
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
						<p ref={elm => (bioCopy.current[0] = elm)}>{t('bio.p1')}</p>
						<p ref={elm => (bioCopy.current[1] = elm)}>
							{t('bio.p2.part1')}
							<a className="link-hover" href="https://www.cs.ubc.ca/" target="_blank" rel="noreferrer">
								{t('bio.p2.cpsc')}
							</a>
							{t('bio.p2.and')}
							<a
								className="link-hover"
								href="https://www.stat.ubc.ca/"
								target="_blank"
								rel="noreferrer">
								{t('bio.p2.stats')}
							</a>
							{t('bio.p2.part2')}
							<a
								className="link-hover"
								href="https://www.bcit.ca/programs/front-end-web-developer-certificate-full-time-6535cert/"
								target="_blank"
								rel="noreferrer">
								{t('bio.p2.frontend_dev')}
							</a>
							{t('bio.p2.part3')}
						</p>
						<p ref={elm => (bioCopy.current[2] = elm)}>
							{t('bio.p3.part1')}
							<a
								className="link-hover"
								href="https://soundcloud.com/ianespanto"
								target="_blank"
								rel="noreferrer">
								{t('bio.p3.composer')}
							</a>
							{t('bio.p3.part2')}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function SkillList({ isDesktopVers }) {
	const { t } = useTranslation();
	const skillListRef = useRef(null);

	const skillLists = [
		{
			title: 'programming_languages',
			icon: 'bag',
			icon_paths: 19,
			list: ['JavaScript / ES6', 'React JSX', 'HTML5', 'CSS / SCSS', 'PHP'],
		},
		{
			title: 'professional_skillset',
			icon: 'bulb',
			icon_paths: 15,
			list: [
				`React.js (${t('skill_list.latest')})`,
				'CMS / Wordpress',
				`SPA ${t('skill_list.development')}`,
				`GSAP ${t('skill_list.animation')}`,
				`SQL ${t('skill_list.database')}`,
			],
		},
		{
			title: 'development_tools',
			icon: 'gear',
			icon_paths: 17,
			list: ['Adobe Photoshop', 'Visual Studio Code', 'Git', 'NPM', 'Gulp.js'],
		},
	];

	const className =
		'about-content sl ' +
		(isDesktopVers ? 'row space-around sl--list show-portrait' : 'sl--carousel hide-portrait');

	useEffect(() => {
		if (skillListRef.current && !isDesktopVers) {
			new Flickity(skillListRef.current, { cellAlign: 'center', prevNextButtons: false });
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
						<p className="heading skill-heading">{t(`skill_list.${title}`)}</p>
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
