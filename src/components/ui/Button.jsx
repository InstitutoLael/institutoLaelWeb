
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  icon,
  href,
  to,
  ...props 
}, ref) => {
  
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all rounded-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variants
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20",
    secondary: "bg-white text-slate-950 hover:bg-slate-100 shadow-xl shadow-white/10",
    outline: "bg-transparent border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
    amber: "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20"
  };

  // Sizes
  const sizes = {
    sm: "text-[10px] py-3 px-5",
    md: "text-xs py-4 px-8",
    lg: "text-sm py-5 px-10"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Content with optional icon
  const content = (
    <>
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2 text-lg">{icon}</span>
      ) : null}
      {children}
    </>
  );

  // Render clickable element type
  if (to) {
    return (
      <Link to={to} className={combinedClasses} ref={ref} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={combinedClasses} 
        ref={ref} 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      className={combinedClasses} 
      ref={ref} 
      disabled={loading}
      whileHover={!props.disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!props.disabled && !loading ? { scale: 0.95 } : {}}
      {...props}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
