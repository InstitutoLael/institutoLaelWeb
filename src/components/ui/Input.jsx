
import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-slate-600 group-focus-within:text-indigo-500'}`}>
            <Icon />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-white/5 border rounded-2xl py-4 ${Icon ? 'pl-12' : 'pl-6'} pr-6 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300
            ${error 
              ? 'border-red-500/50 bg-red-500/5 focus:border-red-500' 
              : 'border-white/10 focus:border-indigo-500 hover:border-white/20'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-[9px] font-bold ml-2 uppercase italic tracking-wide animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
