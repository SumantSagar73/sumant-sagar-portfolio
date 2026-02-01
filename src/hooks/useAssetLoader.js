import { useState, useEffect } from 'react';

export const useAssetLoader = () => {
    const [progress, setProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        // We want a mix of real asset tracking and a minimum "show time" for the preloader
        // to ensure the transition doesn't happen too quickly/flash.

        const startTime = Date.now();
        const minDuration = 2000; // 2 seconds minimum

        const updateProgress = () => {
            if (!mounted) return;

            const elapsed = Date.now() - startTime;
            const timeProgress = Math.min((elapsed / minDuration) * 100, 100);

            // In a real app, we could track document.readyState or specific assets
            // but document.readyState === 'complete' is usually what we want for "all assets"

            const isWindowLoaded = document.readyState === 'complete';

            // Combination of time and window load
            let totalProgress = timeProgress;

            if (isWindowLoaded) {
                // If window is loaded, we can accelerate to 100%
                totalProgress = Math.max(timeProgress, 100);
            } else {
                // If not loaded, cap at 90% until window.onload fires
                totalProgress = Math.min(timeProgress, 90);
            }

            setProgress(totalProgress);

            if (totalProgress >= 100) {
                setIsReady(true);
            } else {
                requestAnimationFrame(updateProgress);
            }
        };

        const handleLoad = () => {
            // Window fully loaded, but we still respect the refresh rate
        };

        window.addEventListener('load', handleLoad);
        requestAnimationFrame(updateProgress);

        return () => {
            mounted = false;
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return { progress, isReady };
};
