import { useEffect, useState, useCallback } from 'react';
import { defaultLang, langIds } from './variables';

// reads a supported language id from the current query string
const getLangFromSearch = search => {
	const searchLang = new URLSearchParams(search).get('lang');

	return langIds.includes(searchLang) ? searchLang : null;
};

// owns app language state and keeps it synced with the URL and i18n
export default function useAppLanguage({ location, navigate, i18n }) {
	// prefers the URL first, then localStorage, then the default language
	const initialLang = getLangFromSearch(window.location.search) || localStorage.lang || defaultLang;
	const [lang, setLang] = useState(langIds.includes(initialLang) ? initialLang : defaultLang);

	// updates both React state and the current ?lang= query param
	const handleLangChange = useCallback(
		nextLang => {
			// ignores unsupported language ids
			if (!langIds.includes(nextLang)) {
				return;
			}

			const searchParams = new URLSearchParams(location.search);
			searchParams.set('lang', nextLang);

			setLang(nextLang);
			navigate(
				{
					pathname: location.pathname,
					search: `?${searchParams.toString()}`,
				},
				{ replace: true },
			);
		},
		[location.pathname, location.search, navigate],
	);

	useEffect(() => {
		const searchLang = getLangFromSearch(location.search);

		// applies URL-driven language changes from direct links or navigation updates
		if (searchLang && searchLang !== lang) {
			setLang(searchLang);
		}
	}, [location.search, lang]);

	useEffect(() => {
		// keeps the i18n runtime, localStorage, and the document language attribute aligned
		if (langIds.includes(lang)) {
			i18n.changeLanguage(lang);
			localStorage.setItem('lang', lang);
			document.documentElement.lang = lang;
		}
	}, [i18n, lang]);

	return { lang, handleLangChange };
}
