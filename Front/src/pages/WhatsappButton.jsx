import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
};

export default function WhatsAppButton() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight / 2) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        // Naviga semplicemente alla pagina dei contatti
        navigate('/contacts');
    };

    return (
        visible && (
            <motion.a
                onClick={handleClick}
                className="fixed bottom-5 right-4 bg-indigo-800 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={buttonVariants}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0-4.418-4.03-8-9-8S3 7.582 3 12c0 1.658.682 3.187 1.822 4.393C4.396 18.117 3 20.26 3 20.26s2.631-.447 4.522-1.722C9.025 19.494 10.973 20 13 20c4.97 0 9-3.582 9-8z"
                    />
                </svg>
            </motion.a>
        )
    );
}
