import React, { useId, forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options?: string[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className = "", options = [], ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mr-2 block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <select
          id={id}
          className={`bg-primary-foreground px-10 py-2 rounded-lg border-2 hover:border-primary cursor-pointer ${className}`}
          ref={ref}
          {...props}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
