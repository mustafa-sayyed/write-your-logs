import React, { useId, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", placeholder = "", className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1.5">
            {label}
          </label>
        )}
        <input
          id={id}
          className={`px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground border border-border bg-background w-full transition-all placeholder:text-muted-foreground ${className}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
