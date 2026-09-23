import React from "react";
import { motion } from "framer-motion";

// Transición entre páginas: solo un fundido corto. Sin escala ni
// desplazamiento, para que el texto nunca se vea borroso.
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default PageTransition;
