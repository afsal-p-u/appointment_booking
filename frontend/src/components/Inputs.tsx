import { ChangeEvent } from "react";

type InputsProps = {
    type: string,
    placeholder: string,
    name: string,
    change: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Inputs = ({ type, placeholder, name, change } : InputsProps) => {
  return (
    <input
      type={type}
      name={name}
      onChange={change}
      placeholder={placeholder}
      className="px-[15px] py-[6px] text-[13px] outline-none border-[1px] border-[var(--white)] bg-transparent text-white
      placeholder:text-[var(--light)]"
      required
    />
  );
};

export default Inputs;
