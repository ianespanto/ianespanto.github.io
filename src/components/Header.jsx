import { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { menuItems } from './utils/variables';
import { viewport, delayRedirect } from './utils/helpers';
import { gsap } from 'gsap';

export default function Header({
	pageTransInProgress,
	setPageTransInProgress,
	scrollTop,
	lastScrollTop,
	setMobileNavOpen,
	entireAnimationCompleted,
	windowSize,
}) {
	const header = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Show and hide header
		if (header.current && entireAnimationCompleted) {
			if (scrollTop > lastScrollTop.current) {
				if (scrollTop > header.current.offsetHeight) {
					header.current.classList.add('hide-header');
				} else {
					header.current.classList.remove('hide-header');
				}
			} else {
				header.current.classList.remove('hide-header');
			}
		}
	}, [scrollTop, windowSize]);

	useEffect(() => {
		// page fade in/out animation
		if (pageTransInProgress) {
			if (!header.current.classList.contains('hide-header')) {
				const tl = gsap.timeline({ delay: 0.2 });
				tl.set(header.current, { clearProps: 'all' });
				tl.to(header.current, 1.5, { y: -200, alpha: 0, ease: 'power4.inOut', clearProps: 'all' }, 'l');
			}
		} else if (!pageTransInProgress) {
			header.current.classList.remove('hide-header');
			const tl = gsap.timeline();
			tl.set(header.current, { y: 200, alpha: 0 });
			tl.to(header.current, 1.5, { y: 0, alpha: 1, ease: 'power4.inOut', clearProps: 'all' });
		}
	}, [pageTransInProgress]);

	return (
		<>
			<header ref={header}>
				<div className="header row space-between">
					<div className="header__logo row align-center">
						<div className="logo"></div>
					</div>

					<nav className="align-center show-medium">
						<ul>
							{menuItems.map(({ id, link }, i) => (
								<li key={'mainNavLink_' + i + '_' + id}>
									<NavLink
										to={link}
										className={({ isActive }) =>
											'link-hover link-hover--long' + (isActive ? ' current' : '')
										}
										onClick={e => delayRedirect(e, link, navigate, setPageTransInProgress)}>
										{id}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
					<div className="mn-trigger align-center hide-medium" onClick={() => setMobileNavOpen(true)}>
						<span className="mn-menu">Menu</span>
					</div>
				</div>
			</header>
		</>
	);
}
