import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components/Preloader.css';

const Preloader = ({ progress = 0, isReady = false, onComplete }) => {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (isReady && progress >= 100) {
            const timer = setTimeout(() => {
                setComplete(true);
                if (onComplete) onComplete();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [progress, isReady, onComplete]);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="preloader-container"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    <div className="preloader-content">
                        <motion.div
                            className="preloader-logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            SUMANT SAGAR
                        </motion.div>

                        <div className="preloader-bar-container">
                            <motion.div
                                className="preloader-bar-fill"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <div className="preloader-percentage">
                            {Math.round(progress)}%
                        </div>

                        <motion.div
                            className="preloader-status"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {progress < 100 ? "Initializing Experience..." : "Ready to Explore"}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
