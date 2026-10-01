import React from "react";
import { motion } from "framer-motion";
import { primeraPintura } from "../lib/hidratacion";

// Transición entre páginas: solo un fundido corto. Sin escala ni
// desplazamiento, para que el texto nunca se vea borroso.
// Si la portada llegó pre-dibujada en el HTML, la primera vez no hay fundido.
let usado = false;

const PageTransition = ({ children }) => {
  const [sinFundido] = React.useState(() => {
    const v = !usado && primeraPintura();
    usado = true;
    return v;
  });
  return (
  <motion.div
    initial={sinFundido ? false : { opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
  );
};

export default PageTransition;
