import { useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { menuItems } from './utils/variables';
import { delayRedirect } from './utils/helpers';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

export default function Header({
	pageTransInProgress,
	setPageTransInProgress,
	scrollTop,
	lastScrollTop,
	setMobileNavOpen,
	entireAnimationCompleted,
	windowSize,
}) {
	const { t } = useTranslation();
	const header = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();
	const desktopNavHasKeyboardFocus = () => {
		return Boolean(header.current?.querySelector('nav.show-medium [data-focus-method="key"]:focus-visible'));
	};

	// lastScrollTop is a stable ref so this effect only needs the values that actually drive reruns
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// Show and hide header
		if (header.current && entireAnimationCompleted) {
			if (desktopNavHasKeyboardFocus()) {
				header.current.classList.remove('hide-header');
				return;
			}

			if (scrollTop > lastScrollTop.current && scrollTop + windowSize.h < document.body.clientHeight) {
				if (scrollTop > header.current.offsetHeight) {
					header.current.classList.add('hide-header');
				} else {
					header.current.classList.remove('hide-header');
				}
			} else {
				header.current.classList.remove('hide-header');
			}
		}
	}, [entireAnimationCompleted, scrollTop, windowSize]);

	useEffect(() => {
		const headerElement = header.current;

		if (!headerElement) {
			return;
		}

		const syncHeaderFocusVisibility = () => {
			if (!header.current || !entireAnimationCompleted) {
				return;
			}

			if (desktopNavHasKeyboardFocus()) {
				header.current.classList.remove('hide-header');
			}
		};

		headerElement.addEventListener('focusin', syncHeaderFocusVisibility);

		return () => {
			headerElement.removeEventListener('focusin', syncHeaderFocusVisibility);
		};
	}, [entireAnimationCompleted]);

	useEffect(() => {
		// page fade in/out animation
		if (pageTransInProgress) {
			if (!header.current.classList.contains('hide-header')) {
				const tl = gsap.timeline({ delay: 0.2 });
				tl.set(header.current, { clearProps: 'all' });
				tl.to(header.current, { duration: 1.5, y: -200, alpha: 0, ease: 'power4.inOut', clearProps: 'all' }, 'l');
			}
		} else if (!pageTransInProgress) {
			header.current.classList.remove('hide-header');
			const tl = gsap.timeline();
			tl.set(header.current, { y: 200, alpha: 0 });
			tl.to(header.current, { duration: 1.5, y: 0, alpha: 1, ease: 'power4.inOut', clearProps: 'all' });
		}
	}, [pageTransInProgress]);

	return (
		<>
			<header className="site-header" ref={header}>
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
										tabIndex={location.pathname === link ? -1 : 0}
										className={({ isActive }) =>
											'link-hover link-hover--black link-hover--long' +
											(isActive ? ' current' : '')
										}
										onClick={e => delayRedirect(e, link, navigate, setPageTransInProgress)}
									>
										{t(`menu_items.${id}`)}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
					<div className="mn-trigger align-center hide-medium" onClick={() => setMobileNavOpen(true)}>
						<span className="mn-menu">{t('menu')}</span>
					</div>
				</div>
			</header>
		</>
	);
}
