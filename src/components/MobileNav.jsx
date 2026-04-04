import { useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './utils/variables';
import { delayRedirect } from './utils/helpers';
import Footer from './Footer';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

export default function MobileNav({
	setPageTransInProgress,
	mobileNavOpen,
	setMobileNavOpen,
	activeFooterTooltip,
	setActiveFooterTooltip,
	windowSize,
	lang,
	setLang,
}) {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const mnRef = useRef(null);

	const clickHandle = (e, link) => {
		delayRedirect(e, link, navigate, setPageTransInProgress, true);

		setTimeout(() => {
			setMobileNavOpen(false);
		}, 200);
	};

	useEffect(() => {
		gsap.set(mnRef.current, {
			height: windowSize.h,
		});
	}, [windowSize]);

	return (
		<div
			className={`mn ${mobileNavOpen ? 'is-open' : 'no-action'}`}
			ref={mnRef}
			aria-hidden={!mobileNavOpen}
			inert={!mobileNavOpen ? '' : undefined}
		>
			<div className="mn-header row">
				<div className="mn-close" onClick={() => setMobileNavOpen(false)}>
					<span>{t('close')}</span>
				</div>
			</div>
			<nav className="mn-items column align-center" aria-label="Mobile">
				{menuItems.map(({ id, link }, i) => (
					<div
						key={'mobileNavLink_' + i + '_' + id}
						className={`mn-item${link === location.pathname ? ' current' : ''}`}
					>
						<NavLink to={link} onClick={e => clickHandle(e, link)}>
							<span>{t(`menu_items.${id}`)}</span>
						</NavLink>
					</div>
				))}
			</nav>
			<div className="mn-footer footer">
				<Footer
					isMobileNav={true}
					activeTooltip={activeFooterTooltip}
					setActiveTooltip={setActiveFooterTooltip}
					lang={lang}
					setLang={setLang}
				/>
			</div>
		</div>
	);
}
