import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phone = "56964626568";
    const message = "Hola, estoy viendo la web y tengo una duda sobre los cursos...";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999]">
            <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    if (window.gtag) {
                        window.gtag('event', 'click_whatsapp_contact', {
                            'event_category': 'Engagement',
                            'event_label': 'Floating Widget'
                        });
                    }
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative block"
                title="Contactar por WhatsApp"
            >
                {/* Sutil efecto pulse (latido) */}
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[#25D366] rounded-full z-0"
                />

                <div className="relative z-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 text-3xl border-4 border-white/10 active:border-white/20 transition-all">
                    <FaWhatsapp />
                </div>
            </motion.a>
        </div>
    );
}
