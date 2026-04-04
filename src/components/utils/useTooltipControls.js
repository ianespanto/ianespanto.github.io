import { useCallback, useEffect, useRef } from 'react';

export default function useTooltipControls({ activeTooltip, setActiveTooltip, tooltipNames }) {
	const tooltipRefs = useRef(
		tooltipNames.reduce((accumulator, tooltipName) => {
			accumulator[tooltipName] = { group: null, trigger: null };
			return accumulator;
		}, {})
	);

	const setTooltipRef = useCallback(
		(tooltipName, refType) => node => {
			tooltipRefs.current[tooltipName][refType] = node;
		},
		[]
	);

	const isTooltipOpen = useCallback(
		tooltipName => {
			return activeTooltip === tooltipName;
		},
		[activeTooltip]
	);

	const closeAllTooltips = useCallback(
		focusTarget => {
			setActiveTooltip(null);

			if (focusTarget) {
				tooltipRefs.current[focusTarget]?.trigger?.focus();
			}
		},
		[setActiveTooltip]
	);

	const toggleTooltip = useCallback(
		tooltipName => {
			const isOpen = activeTooltip === tooltipName;

			closeAllTooltips();

			if (!isOpen) {
				setActiveTooltip(tooltipName);
			}
		},
		[activeTooltip, closeAllTooltips, setActiveTooltip]
	);

	const handleTriggerFocus = useCallback(
		tooltipName => {
			if (activeTooltip && activeTooltip !== tooltipName) {
				closeAllTooltips();
			}
		},
		[activeTooltip, closeAllTooltips]
	);

	const handleGroupBlur = useCallback(
		(tooltipName, e) => {
			if (tooltipRefs.current[tooltipName]?.group?.contains(e.relatedTarget)) {
				return;
			}

			if (activeTooltip === tooltipName) {
				closeAllTooltips();
			}
		},
		[activeTooltip, closeAllTooltips]
	);

	const handleTooltipSelection = useCallback(
		(tooltipName, e) => {
			const actionTarget = e.target.closest('a, button, [role="button"], [role="menuitem"], [tabindex]');

			if (!actionTarget || actionTarget.classList.contains('tooltipTrigger')) {
				return;
			}

			if (activeTooltip === tooltipName) {
				closeAllTooltips();
			}
		},
		[activeTooltip, closeAllTooltips]
	);

	useEffect(() => {
		if (!activeTooltip) {
			return;
		}

		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeAllTooltips(activeTooltip);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [activeTooltip, closeAllTooltips]);

	return {
		closeAllTooltips,
		handleGroupBlur,
		handleTooltipSelection,
		handleTriggerFocus,
		isTooltipOpen,
		setTooltipRef,
		toggleTooltip,
	};
}
