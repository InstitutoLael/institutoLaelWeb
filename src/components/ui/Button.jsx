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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variants
  const variants = {
    primary: "bg-lael-accent text-lael-primary hover:bg-lael-accent/90 hover:shadow-[0_0_20px_rgba(198,166,107,0.3)]",
    secondary: "bg-transparent border border-white/10 text-lael-light hover:bg-white/5 hover:border-lael-accent/30 hover:text-lael-accent",
    ghost: "bg-transparent text-lael-muted hover:text-lael-accent relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-lael-accent hover:after:w-full after:transition-all after:duration-300"
  };

  // Sizes
  const sizes = {
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg py-4 px-8"
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

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
