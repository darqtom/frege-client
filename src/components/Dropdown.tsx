import React, { FormEventHandler } from "react";

type DropdownProps = {
  options: string[];
  name: string;
  id: string;
  onChange: FormEventHandler<HTMLSelectElement>;
};

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  options,
  name,
  id,
  onChange,
}) => {
  return (
    <div>
      <select
        name={name}
        id={id}
        onChange={onChange}
        className="outline-none text-center text-sm text-gray-800 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
