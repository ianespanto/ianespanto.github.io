import { useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './utils/variables';
import { delayRedirect } from './utils/helpers';
import Footer from './Footer';
import { gsap } from 'gsap';

export default function MobileNav({
	setPageTransInProgress,
	mobileNavOpen,
	setMobileNavOpen,
	creditTooltipOpen,
	setCreditTooltipOpen,
	windowSize,
}) {
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
		<div className={`mn ${mobileNavOpen ? 'is-open' : 'no-action'}`} ref={mnRef}>
			<div className="mn-header row">
				<div className="mn-close" onClick={() => setMobileNavOpen(false)}>
					<span>close</span>
				</div>
			</div>
			<div className="mn-items column align-center">
				{menuItems.map(({ id, link }, i) => (
					<div
						key={'mobileNavLink_' + i + '_' + id}
						className={`mn-item${link === location.pathname ? ' current' : ''}`}>
						<NavLink to={link} onClick={e => clickHandle(e, link)}>
							<span>{id}</span>
						</NavLink>
					</div>
				))}
			</div>
			<div className="mn-footer footer">
				<Footer
					isMobileNav={true}
					creditTooltipOpen={creditTooltipOpen}
					setCreditTooltipOpen={setCreditTooltipOpen}
				/>
			</div>
		</div>
	);
}
