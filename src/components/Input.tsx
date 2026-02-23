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
          <label htmlFor={id} className="p-1">
            {label}
          </label>
        )}
        <input
          id={id}
          className={`px-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-ring text-foreground border-2 bg-background w-full ${className}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
