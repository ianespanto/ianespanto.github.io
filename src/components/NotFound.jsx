import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { delayRedirect } from './utils/helpers';

export default function NotFound({ pageTransInProgress, setPageTransInProgress }) {
	gsap.registerPlugin(ScrollToPlugin);

	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();

	// route guard should only run on mount for this page
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		document.title = '404 · Ian Espanto';
		gsap.set(window, { scrollTo: 0 });

		if (location.pathname !== '/404') {
			navigate('/404', { replace: true });
		}
	}, []);

	return (
		<>
			<main className="error row align-center">
				<div className="inner-wrapper">
					<section aria-labelledby="not-found-heading">
						<p className="error__text">
							<span>{t('page_not_found')}</span>
							<span>&#x1F645;</span>
						</p>
						<h1 className="error__heading">404</h1>
						<p className="error__return">
							<Link
								key="error-page-home-link"
								className="link-hover transition-link"
								to="/"
								onClick={e => delayRedirect(e, '/', navigate, setPageTransInProgress)}
							>
								{t('return_to_home')}
							</Link>
						</p>
					</section>
				</div>
			</main>
		</>
	);
}
