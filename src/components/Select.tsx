import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { label, className = "", options = [], ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="mr-2 block text-sm font-medium mb-1" >{label}</label>}
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
});

export default Select;
